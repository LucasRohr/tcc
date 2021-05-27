import React, { useState, useEffect, useMemo } from 'react'
import { PageTitle, Tabs } from 'app-components'
import { useLoggedUser, useCredential } from 'app-hooks'
import { ROLES } from 'app-constants'
import { CredentialsList, CreateCredential } from './components'

import './credentials-management.style.scss'

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
  const [canShowContent, setCanShowContent] = useState(false)

  const { loggedUser } = useLoggedUser()
  const { getOwnerHeritageCredentials, getHeirHeritageCredentials } = useCredential()

  const currentAccountType = loggedUser.currentAccount.type
  const isOwnerAccount = currentAccountType === ROLES.OWNER

  const getCredentialForAccountType = async accountId => {
    if (isOwnerAccount) {
      return await getOwnerHeritageCredentials(accountId)
    }

    return await getHeirHeritageCredentials(accountId)
  }

  const getCredentials = async () => {
    const accountId = loggedUser.currentAccount.id

    const result = await getCredentialForAccountType(accountId)

    setCanShowContent(true)

    if (result) {
      setCredentials(result)
    }
  }

  useEffect(() => {
    getCredentials()
  }, [])

  useEffect(() => {
    if (currentTab === TAB_OPTIONS[0].value) {
      getCredentials()
    }
  }, [currentTab])

  const CONTENT_OPTIONS = useMemo(
    () => ({
      CREDENTIALS_LIST: {
        component: CredentialsList,
        props: { credentials, loadCredentials: getCredentials },
      },

      CREDENTIAL_FORM: {
        component: CreateCredential,
        props: {},
      },
    }),
    [credentials, getCredentials]
  )

  const renderContent = () => {
    if (isOwnerAccount) {
      const ContentComponent = CONTENT_OPTIONS[currentTab].component
      const props = CONTENT_OPTIONS[currentTab].props

      return <ContentComponent {...props} />
    }

    return <CredentialsList credentials={credentials} isHeirAccount />
  }

  const renderTabs = () =>
    isOwnerAccount ? <Tabs options={TAB_OPTIONS} currentTab={currentTab} setCurrentTab={setCurrentTab} /> : null

  return canShowContent ? (
    <div className="credentials-management-container">
      <PageTitle title="Gerenciamento de Credenciais" />
      {renderTabs()}
      {renderContent()}
    </div>
  ) : null
}

export { CredentialsManagement }
