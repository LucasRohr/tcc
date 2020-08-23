import React, { useState, useEffect, useMemo } from 'react'
import { PageTitle, Tabs } from 'app-components'
import { useLoggedUser, useCredential } from 'app-hooks'
import { ROLES } from 'app-constants'

import './credentials-management.style.scss'
import { CredentialsList } from './components/index'

const TAB_OPTIONS = [
  {
    id: 'credentialsList',
    name: 'credentialsList',
    value: 'CREDENTIALS_LIST',
    label: 'Listagem',
  },

  {
    id: 'credentialsForm',
    name: 'credentialsForm',
    value: 'CREDENTIAL_FORM',
    label: 'Criação',
  },
]

const CredentialsManagement = () => {
  const [currentTab, setCurrentTab] = useState(TAB_OPTIONS[0].value)
  const [credentials, setCredentials] = useState([])

  const CONTENT_OPTIONS = useMemo(
    () => ({
      CREDENTIALS_LIST: {
        component: CredentialsList,
        props: { credentials },
      },

      CREDENTIAL_FORM: {
        component: () => <div />,
        props: {},
      },
    }),
    [credentials]
  )

  const { loggedUser } = useLoggedUser()
  const { getOwnerHeritageCredentials, getHeirReceivedCredentials } = useCredential()

  const currentAccountType = loggedUser.currentAccount.type

  const getCredentials = async () => {
    const isOwner = currentAccountType === ROLES.OWNER
    const accountId = loggedUser.currentAccount.id

    const result = isOwner ? await getOwnerHeritageCredentials(accountId) : await getHeirReceivedCredentials(accountId)

    if (result && result.length) {
      setCredentials(result.credentials)
    }
  }

  useEffect(() => {
    getCredentials()
  }, [])

  const renderContent = () => {
    const ContentComponent = CONTENT_OPTIONS[currentTab].component
    const props = CONTENT_OPTIONS[currentTab].props

    return <ContentComponent {...props} />
  }

  return (
    <div className="credentials-management-container">
      <PageTitle title="Gerenciamento de Credenciais" />
      <Tabs options={TAB_OPTIONS} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {renderContent()}
    </div>
  )
}

export { CredentialsManagement }
