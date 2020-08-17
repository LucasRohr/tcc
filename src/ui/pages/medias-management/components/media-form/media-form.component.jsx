import React from 'react'
import PropTypes from 'prop-types'
import { useMediaForm } from './media-form.hook'

const MediaForm = ({ selectedMedia, onFormButtonClick }) => {
  const { isValid, renderMediaFields, buildApiObject, sendToApi } = useMediaForm({ initialData: selectedMedia })

  return <div> {renderMediaFields()} </div>
}

MediaForm.propTypes = {
  selectedMedia: PropTypes.object,
  onFormButtonClick: PropTypes.func,
}

export { MediaForm }
