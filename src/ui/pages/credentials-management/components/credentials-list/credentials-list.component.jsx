import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { EmptyContent } from 'app-components'
import { noopFunction } from 'app-helpers'
import { CredentialCard } from '../credential-card/credential-card.component'

import './credentials-list.style.scss'

const CredentialsList = ({ credentials, loadCredentials, isHeirAccount }) => {
  const credentialsCards = useMemo(
    () =>
      credentials.map(credential => (
        <CredentialCard credential={credential} loadCredentials={loadCredentials} isHeirAccount={isHeirAccount} />
      )),
    [credentials]
  )

  const renderCredentialsList = () => {
    const hasCredentials = credentials && credentials.length

    if (hasCredentials) {
      return credentialsCards
    }

    return (
      <div className="credentials-list-empty">
        <EmptyContent mainMessage="Não existem credenciais criadas para serem exibidas." />
      </div>
    )
  }

  return <div className="credentials-list-container"> {renderCredentialsList()} </div>
}

CredentialsList.defaultProps = {
  loadCredentials: noopFunction,
}

CredentialsList.propTypes = {
  credentials: PropTypes.array,
  loadCredentials: PropTypes.func,
  isHeirAccount: PropTypes.bool,
}

export { CredentialsList }
