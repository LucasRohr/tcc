import React from 'react'
import PropTypes from 'prop-types'
import { EmptyContent } from 'app-components'
import { CredentialCard } from '../credential-card/credential-card.component'

import './credentials-list.style.scss'

const CredentialsList = ({ credentials }) => {
  const renderCredentialsList = () => {
    const hasCredentials = credentials && credentials.length

    if (hasCredentials) {
      return credentials.map(credential => <CredentialCard credential={credential} />)
    }

    return (
      <div className="credentials-list-empty">
        <EmptyContent mainMessage="Não existem credenciais criadas para serem exibidas." />
      </div>
    )
  }

  return <div className="credentials-list-container"> {renderCredentialsList()} </div>
}

CredentialsList.propTypes = {
  credentials: PropTypes.array,
}

export { CredentialsList }
