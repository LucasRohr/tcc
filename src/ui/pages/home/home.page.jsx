import React, { useMemo } from 'react'
import './home.style.scss'
import { Title } from 'app-components'
import { useLoggedUser, useRoute } from 'app-hooks'
import { noopFunction } from 'app-helpers'
import { MediasIcon, CredentialsIcon, HeirsManagementIcon, AlertIcon } from 'ui/icons/shapes/index'
import { ROLES } from 'app-constants'
import { ServiceCard } from './components/index'

const Home = () => {
  const { loggedUser } = useLoggedUser()
  const { goToHeirsManagement } = useRoute()

  const accountType = useMemo(() => loggedUser.currentAccount.type, [loggedUser.currentAccount])

  const defaultOptions = useMemo(() => [
    {
      title: 'Gerenciamento de Mídias',
      description:
        accountType === ROLES.OWNER
          ? 'Gerencie e adicione mídias da sua herança digital, como imagens e documentos'
          : 'Gerencie as mídias passadas para você por esta conta',
      onClick: noopFunction,
      icon: <MediasIcon />,
      disabled: accountType === ROLES.HEIR,
    },

    {
      title: 'Credenciais',
      description:
        accountType === ROLES.OWNER
          ? 'Gerencie credenciais de serviços importantes em sua herança, como logins e senhas'
          : 'Tenha acesso às credenciais herdadas por você e atribuídas nesta conta',
      onClick: noopFunction,
      icon: <CredentialsIcon />,
      disabled: accountType === ROLES.HEIR,
    },
  ])

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
    []
  )

  const heirOptions = useMemo(
    () => [
      ...defaultOptions,

      {
        title: 'Aviso de Proprietário',
        description: 'Entre em contato conosco para comunicar o falecimento do proprietário da herança',
        onClick: noopFunction,
        icon: <AlertIcon />,
      },
    ],
    []
  )

  const renderCards = () => {
    const options = accountType === ROLES.OWNER ? ownerOptions : heirOptions

    return options.map(({ title, description, onClick, icon, disabled }) => (
      <ServiceCard title={title} description={description} onClick={onClick} icon={icon} disabled={disabled} />
    ))
  }

  return (
    <div className="home-container">
      <Title variant="sans-serif">Boas-vindas {loggedUser.name}</Title>

      <div className="home-services-section">
        <div>Serviços</div>
        <div className="home-services-cards-container">{renderCards()}</div>
      </div>
    </div>
  )
}

export { Home }
