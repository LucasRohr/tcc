import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMediaForm } from './media-form.hook'
import { useModal } from 'app-hooks'
import { HeirsModal } from '../heirs-modal/heirs-modal.component'

import './media-form.style.scss'

const MediaForm = ({ selectedMedia, onFormButtonClick, mediaType }) => {
  const [heirs, setHeirs] = useState([])
  const [baseHeirs, setBaseHeirs] = useState([])

  const { isValid, renderMediaFields, buildApiObject, sendToApi } = useMediaForm({
    initialData: selectedMedia,
    mediaType,
  })
  const { showModal } = useModal()

  const getMediaHeirsIds = async () => {
    const selectedHeirs = heirs.filter(heirItem => heirItem.isChecked)
    const heirsIds = selectedHeirs.maṕ(heirItem => heirItem.item.id)

    return heirsIds
  }

  const showMediaHeirsModal = () => {
    showModal({
      content: (
        <HeirsModal
          heirs={heirs}
          setHeirs={setHeirs}
          baseHeirs={baseHeirs}
          setBaseHeirs={setBaseHeirs}
          mediaId={selectedMedia ? selectedMedia.id : null}
        />
      ),
    })
  }

  return (
    <div className="media-form-container">
      <div className="media-form-fields-container">{renderMediaFields()}</div>
    </div>
  )
}

MediaForm.propTypes = {
  selectedMedia: PropTypes.object,
  onFormButtonClick: PropTypes.func,
  mediaType: PropTypes.string,
}

export { MediaForm }
