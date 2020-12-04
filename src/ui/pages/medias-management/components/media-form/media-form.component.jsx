import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useModal, useLoggedUser, useMedia, useToastAlert } from 'app-hooks'
import { HeirsManagementIcon } from 'app-icons'
import { Button, Text, Switch, HeirsModal } from 'app-components'
import { UPLOAD_OPTIONS } from 'app-constants'
import { useMediaForm } from './media-form.hook'

import './media-form.style.scss'

const MediaForm = ({ selectedMedia, onFormButtonClick, mediaType, loadMedias }) => {
  const [uploadOption, setUploadOption] = useState(UPLOAD_OPTIONS.SINGLE)

  const { isValid, renderInputFields, renderMediaField, buildApiObject, sendToApi } = useMediaForm({
    initialData: selectedMedia,
    mediaType,
    uploadOption,
  })

  const { showModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { getAllHeirsForMedia, updateMediaHeirs } = useMedia()
  const { showSuccessToastAlert } = useToastAlert()

  const rightContainerClass = selectedMedia ? 'media-form-edit-right-container' : 'media-form-right-container'

  const getMediaHeirsIds = async heirs => {
    const selectedHeirs = heirs.filter(heirItem => heirItem.isChecked)
    const heirsIds = selectedHeirs.map(heirItem => heirItem.item.id)

    return heirsIds
  }

  const mapHeirs = heirsList => heirsList.map(heirItem => ({ item: heirItem, itemCheck: heirItem.hasMedia }))

  const getAvailableHeirs = async () => {
    const result = await getAllHeirsForMedia(loggedUser.currentAccount.id, selectedMedia.id)

    if (result && result.length) {
      return result
    }
  }

  const getSelectedHeirsId = selectedHeirs => {
    const selectedHeirsFiltered = selectedHeirs.filter(heirItem => heirItem.itemCheck)
    const heirsIds = selectedHeirsFiltered.map(heirItem => heirItem.item.id)

    return heirsIds
  }

  const saveMediaHeirs = async selectedHeirs => {
    const heirsIds = getSelectedHeirsId(selectedHeirs)
    const { id } = selectedMedia

    const mediaObject = {
      id,
      selectedHeirsIds: heirsIds,
    }

    const result = await updateMediaHeirs(mediaObject)

    if (result) {
      loadMedias()
      showSuccessToastAlert('Herdeiros atualizados com sucesso.')
    }
  }

  const showMediaHeirsModal = () => {
    showModal({
      content: <HeirsModal onConfirm={saveMediaHeirs} getHeirs={getAvailableHeirs} mapHeirs={mapHeirs} />,
    })
  }

  const onCancel = () => {
    onFormButtonClick()
  }

  const onConfirm = async () => {
    if (await isValid()) {
      const mediaObject = buildApiObject()
      const heirsId = getMediaHeirsIds()
      const apiObject = { ...mediaObject, heirsIds: heirsId }

      const result = await sendToApi(apiObject)

      if (result) {
        onFormButtonClick()
      }
    }
  }

  const renderFormButtons = () => (
    <div className="media-form-buttons-container">
      <Button onClick={onCancel} variant="light">
        Cancelar
      </Button>
      <Button onClick={onConfirm} variant="primary">
        Confirmar
      </Button>
    </div>
  )

  const renderFormFields = () => {
    if (uploadOption.key === UPLOAD_OPTIONS.SINGLE.key) {
      return (
        <>
          {renderInputFields()}
          {renderMediaField()}
        </>
      )
    }

    return (
      <>
        <Text className="media-form-multiple-info" variant="sans-serif">
          Com o envio múltiplo, você poderá enviar diversos arquivos ao mesmo tempo.
          <br />
          Você não poderá escolher os nomes e descrições agora, devendo editar depois.
        </Text>
        {renderMediaField()}
      </>
    )
  }

  return (
    <div className="media-form-container">
      <div className="media-form-fields-container">
        {renderFormFields()}
        <Button className="media-form-heirs-button" onClick={showMediaHeirsModal} variant="light">
          <Text>Selecionar herdeiros</Text>
          <HeirsManagementIcon className="media-form-heirs-icon" />
        </Button>
      </div>

      <div className={rightContainerClass}>
        {!selectedMedia ? (
          <Switch
            firstOption={UPLOAD_OPTIONS.SINGLE}
            secondOption={UPLOAD_OPTIONS.MULTIPLE}
            onChange={setUploadOption}
          />
        ) : null}
        {renderFormButtons()}
      </div>
    </div>
  )
}

MediaForm.propTypes = {
  selectedMedia: PropTypes.object,
  onFormButtonClick: PropTypes.func,
  mediaType: PropTypes.string,
}

export { MediaForm }
