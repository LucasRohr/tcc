import React, { useMemo, useEffect } from 'react'
import { Title, Text, Button } from 'app-components'
import { useLoggedUser, useRoute, useModal } from 'app-hooks'
import { MediasIcon, CredentialsIcon, HeirsManagementIcon, AlertIcon } from 'app-icons'
import { ROLES, HEIR_STATUS } from 'app-constants'
import { ServiceCard, DisinheritedCard } from './components'
import { HelpIcon } from 'app-icons'
import { CryptoPasswordValidationModalContent } from './components/crypto-password-validation-modal/crypto-password-validation-modal.component'

import './home.style.scss'

const Home = () => {
  const { loggedUser } = useLoggedUser()
  const { goToHeirsManagement, goToMediasManagement, goToCredentialsManagement, goToOwnerWarning } = useRoute()
  const { showModal, hideModal } = useModal()

  const currentAccount = loggedUser.currentAccount

  useEffect(() => {
    if (!localStorage.getItem('cryptoPassword')) {
      renderCryptoPasswordModal()
    }
  }, [])

  const accountType = useMemo(() => currentAccount.type, [loggedUser.currentAccount])

  const isDisinheritedHeir = useMemo(
    () => accountType === ROLES.HEIR && currentAccount.status === HEIR_STATUS.DISINHERITED.key,
    [loggedUser.currentAccount]
  )

  const isInvalidHeir = useMemo(
    () => accountType === ROLES.HEIR && loggedUser.currentAccount.status !== HEIR_STATUS.ACTIVE.key,
    [loggedUser.currentAccount]
  )

  const defaultOptions = useMemo(
    () => [
      {
        title: 'Gerenciamento de Mídias',
        description:
          accountType === ROLES.OWNER
            ? 'Gerencie e adicione mídias da sua herança digital, como imagens e documentos'
            : 'Gerencie as mídias passadas para você por esta conta',
        onClick: goToMediasManagement,
        icon: <MediasIcon />,
        disabled: isInvalidHeir,
      },

      {
        title: 'Credenciais',
        description:
          accountType === ROLES.OWNER
            ? 'Gerencie credenciais de serviços importantes em sua herança, como logins e senhas'
            : 'Tenha acesso às credenciais herdadas por você e atribuídas nesta conta',
        onClick: goToCredentialsManagement,
        icon: <CredentialsIcon />,
        disabled: isInvalidHeir,
      },
    ],
    [loggedUser]
  )

  const ownerOptions = useMemo(
    () => [
      ...defaultOptions,

      {
        title: 'Herdeiros',
        description: 'Faça a escolha e gerenciamento de herdeiros que receberão a sua herança digital',
        onClick: goToHeirsManagement,
        icon: <HeirsManagementIcon />,
      },
    ],
    [loggedUser]
  )

  const heirOptions = useMemo(
    () => [
      ...defaultOptions,

      {
        title: 'Aviso de Proprietário',
        description: 'Entre em contato conosco para comunicar o falecimento do proprietário da herança',
        onClick: goToOwnerWarning,
        icon: <AlertIcon />,
      },
    ],
    [loggedUser]
  )

  const renderCards = () => {
    const options = accountType === ROLES.OWNER ? ownerOptions : heirOptions

    return options.map(({ title, description, onClick, icon, disabled }) => (
      <ServiceCard title={title} description={description} onClick={onClick} icon={icon} disabled={disabled} />
    ))
  }

  const renderAccountMessage = () => {
    const isOwner = accountType === ROLES.OWNER
    const { name: currentAccountName, ownerName } = loggedUser.currentAccount

    const renderBaseHeirText = () => (
      <Text className="home-account-message" variant="sans-serif">
        Você está na conta herdeira: <Text className="home-account-message--highlight">{currentAccountName}</Text>
      </Text>
    )

    if (isOwner) {
      return (
        <Text className="home-account-message" variant="sans-serif">
          Você está em sua conta proprietária:{' '}
          <Text className="home-account-message--highlight">{currentAccountName}</Text>
        </Text>
      )
    }

    if (isDisinheritedHeir) {
      return renderBaseHeirText()
    }

    return (
      <>
        {renderBaseHeirText()}
        <Text className="home-account-message" variant="sans-serif">
          Proprietário desta herança: <Text className="home-account-message--highlight">{ownerName}</Text>
        </Text>
      </>
    )
  }

  const renderCryptoPasswordModal = () => {
    const renderContent = () => (
      <CryptoPasswordValidationModalContent />
    )

    showModal({
      content: renderContent(),
      blockClose: true
    })
  }

  const renderHelpModal = () => {
    const renderContent = () => (
      <div className="home-help-container">
        <Title variant="sans-serif">Olá</Title>
        <Text variant="serif">
          Esta é a tela inicial do sistema, por ela você pode acessar todos os nossos serviços.
          <br />
          <br />A herança destinada para esta conta herdeira ainda não está disponível, portanto, no momento, você pode
          apenas avisar sobre o falecimento do proprietário dela.
        </Text>

        <Button onClick={hideModal} className="home-help-button" variant="primary">
          Entendi
        </Button>
      </div>
    )

    showModal({
      content: renderContent(),
    })
  }

  const renderHelpButton = () => {
    const canShow = accountType === ROLES.HEIR && loggedUser.currentAccount.status === HEIR_STATUS.ACCEPTED.key

    if (canShow) {
      return (
        <Button onClick={renderHelpModal} variant="primary">
          <HelpIcon className="home-help-icon" />
        </Button>
      )
    }

    return null
  }

  const renderContent = () => {
    if (isDisinheritedHeir) {
      const { ownerName } = currentAccount
      const { accounts } = loggedUser

      const hasOtherAccounts = accounts.length > 1
      const hasOwnerAccount = accounts.find(account => account.type === ROLES.OWNER)

      return (
        <DisinheritedCard ownerName={ownerName} hasOwnerAccount={hasOwnerAccount} hasOtherAccounts={hasOtherAccounts} />
      )
    }

    return (
      <div className="home-services-section">
        <div>Serviços</div>
        <div className="home-services-cards-container">{renderCards()}</div>
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="home-info-container">
        <div>
          <Title variant="sans-serif">Boas-vindas {loggedUser.name}</Title>
          {renderAccountMessage()}
        </div>

        {renderHelpButton()}
      </div>

      {renderContent()}
    </div>
  )
}

export { Home }
