import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useModal } from 'app-hooks'
import { HeirsManagementIcon } from 'app-icons'
import { Button, Text, Switch, HeirsModal } from 'app-components'
import { UPLOAD_OPTIONS } from 'app-constants'
import { useMediaForm } from './media-form.hook'

import './media-form.style.scss'

const MediaForm = ({ selectedMedia, onFormButtonClick, mediaType }) => {
  const [uploadOption, setUploadOption] = useState(UPLOAD_OPTIONS.SINGLE)
  const [heirs, setHeirs] = useState([])

  const { isValid, renderInputFields, renderMediaField, buildApiObject, sendToApi } = useMediaForm({
    initialData: selectedMedia,
    mediaType,
    uploadOption,
  })

  const { showModal } = useModal()

  const rightContainerClass = selectedMedia ? 'media-form-edit-right-container' : 'media-form-right-container'

  const getMediaHeirsIds = async () => {
    const selectedHeirs = heirs.filter(heirItem => heirItem.isChecked)
    const heirsIds = selectedHeirs.map(heirItem => heirItem.item.id)

    return heirsIds
  }

  const showMediaHeirsModal = () => {
    showModal({
      content: <HeirsModal onConfirm={setHeirs} />,
    })
  }

  const onCancel = () => {
    onFormButtonClick()
  }

  const onConfirm = async () => {
    if (await isValid()) {
      const mediaObject = buildApiObject()
      const heirsId = getMediaHeirsIds()
      const apiObject = { ...mediaObject, heirs: heirsId }

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
