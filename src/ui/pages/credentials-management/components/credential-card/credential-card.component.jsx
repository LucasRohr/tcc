import React from 'react'
import PropTypes from 'prop-types'
import { useCredentialCard } from './credential-card.hook'

const CredentialCard = ({ credential }) => {
  const { getMainFormFields, getExtraFormFields, isValid, buildApiObject, sendToApi } = useCredentialCard({
    initialData: credential,
  })

  const renderButtons = () => null

  return (
    <div className="credential-card-container">
      <div className="credential-card-left-content">{getMainFormFields()}</div>

      <div className="credential-card-right-content">
        {getExtraFormFields()}
        {renderButtons()}
      </div>
    </div>
  )
}

CredentialCard.propTypes = {
  credential: PropTypes.object.isRequired,
}

export { CredentialCard }
