import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useModal } from 'app-hooks'
import { HeirsManagementIcon } from 'app-icons'
import { Button, Text, Switch } from 'app-components'
import { useMediaForm } from './media-form.hook'
import { HeirsModal } from '../heirs-modal/heirs-modal.component'

import './media-form.style.scss'

const UPLOAD_OPTIONS = {
  SINGLE: {
    key: 'SINGLE',
    label: 'Individual',
  },

  MULTIPLE: {
    key: 'MULTIPLE',
    label: 'Múltiplo',
  },
}

const MediaForm = ({ selectedMedia, onFormButtonClick, mediaType }) => {
  const [uploadOption, setUploadOption] = useState(UPLOAD_OPTIONS.SINGLE)

  const { isValid, renderInputFields, renderMediaField, buildApiObject, sendToApi } = useMediaForm({
    initialData: selectedMedia,
    mediaType,
    uploadOption,
  })

  const { showModal } = useModal()

  const getMediaHeirsIds = async heirs => {
    const selectedHeirs = heirs.filter(heirItem => heirItem.isChecked)
    const heirsIds = selectedHeirs.maṕ(heirItem => heirItem.item.id)

    return heirsIds
  }

  const showMediaHeirsModal = () => {
    showModal({
      content: <HeirsModal mediaId={selectedMedia ? selectedMedia.id : null} />,
    })
  }

  const onCancel = () => {
    onFormButtonClick()
  }

  const onConfirm = async () => {
    if (await isValid()) {
      const mediaObject = buildApiObject()
      const heirs = getMediaHeirsIds()
      const apiObject = { ...mediaObject, heirs }

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

      <div className="media-form-type-and-buttons-container">
        <Switch firstOption={UPLOAD_OPTIONS.SINGLE} secondOption={UPLOAD_OPTIONS.MULTIPLE} onChange={setUploadOption} />
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
