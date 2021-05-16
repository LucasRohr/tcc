import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useModal, useLoggedUser, useMedia, useToastAlert, useLoading } from 'app-hooks'
import { HeirsManagementIcon } from 'app-icons'
import { Button, Text, Switch, HeirsModal } from 'app-components'
import { UPLOAD_OPTIONS } from 'app-constants'
import { useMediaForm } from './media-form.hook'

import './media-form.style.scss'

const MediaForm = ({ selectedMedia, onFormButtonClick, mediaType, loadMedias }) => {
  const [uploadOption, setUploadOption] = useState(UPLOAD_OPTIONS.SINGLE)
  const [heirs, setHeirs] = useState([])

  const { isValid, renderInputFields, renderMediaField, buildApiObject, sendToApi } = useMediaForm({
    initialData: selectedMedia,
    mediaType,
    uploadOption,
  })

  const { showModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { getAllHeirsForMedia } = useMedia()
  const { showSuccessToastAlert } = useToastAlert()
  const { showLoading, hideLoading } = useLoading()

  const mapHeirs = heirsList => heirsList.map(heirItem => ({ item: heirItem, itemCheck: heirItem.hasItem }))

  const getAvailableHeirs = async () => {
    const result = await getAllHeirsForMedia(loggedUser.currentAccount.id)

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
    setHeirs(selectedHeirs)
  }

  const showMediaHeirsModal = () => {
    showModal({
      content: (
        <HeirsModal onConfirm={saveMediaHeirs} defaultHeirs={heirs} getHeirs={getAvailableHeirs} mapHeirs={mapHeirs} />
      ),
    })
  }

  const onCancel = () => {
    onFormButtonClick()
  }

  const onConfirm = async () => {
    if (await isValid()) {
      const mediaObject = buildApiObject()
      const ownerId = loggedUser.currentAccount.id
      const heirsIds = getSelectedHeirsId(heirs)

      const apiObject = {
        ...mediaObject,
        heirsIds,
        ownerId,
        type: mediaType,
        cryptoPassword: localStorage.getItem('cryptoPassword'),
      }

      if (selectedMedia) {
        apiObject.id = selectedMedia.id
      }

      const result = await sendToApi(apiObject)

      if (result) {
        showLoading()

        setTimeout(async () => {
          hideLoading()
          onFormButtonClick()
          await loadMedias()

          const toastMessage = selectedMedia ? 'Mídia atualizada com sucesso.' : 'Mídia criada com sucesso.'

          showSuccessToastAlert(toastMessage)
        }, 5000)
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
      <div className="media-upper-container">
        <div className="media-upper-forms-container">
          {renderFormFields()}
          <Button className="media-form-heirs-button" onClick={showMediaHeirsModal} variant="light">
            <Text>Selecionar herdeiros</Text>
            <HeirsManagementIcon className="media-form-heirs-icon" />
          </Button>
        </div>
        {!selectedMedia ? (
          <div className="media-switch-container">
            <Switch
              firstOption={UPLOAD_OPTIONS.SINGLE}
              secondOption={UPLOAD_OPTIONS.MULTIPLE}
              onChange={setUploadOption}
            />
          </div>
        ) : null}
      </div>

      <div className="media-form-lower-container">
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
