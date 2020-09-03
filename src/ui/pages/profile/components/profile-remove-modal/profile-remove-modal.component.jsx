import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useModal, useLoggedUser, useRoute, useUser, useAccount } from 'app-hooks'
import { Button, Title, Text } from 'app-components'

import './profile-remove-modal.style.scss'

const MIN_ACCOUNTS = 1

const ProfileRemoveModal = ({ isRemovingUser }) => {
  const { hideModal } = useModal()
  const { removeUser } = useUser()
  const { removeAccount } = useAccount()
  const { loggedUser, fetchUserInfo } = useLoggedUser()
  const { goToLogin, goToHome } = useRoute()

  const accountType = loggedUser.currentAccount.type
  const userHasOneAccount = loggedUser.accounts.length === MIN_ACCOUNTS

  const removeCurrentAccount = async () => {
    const result = await removeAccount(loggedUser.currentAccount.id)
    hideModal()

    if (result) {
      fetchUserInfo()
      goToHome()
    }
  }

  const removeCurrentUser = async () => {
    const result = await removeUser(loggedUser.id)
    hideModal()

    if (result) {
      goToLogin()
    }
  }

  const checkRemove = async () => {
    if (isRemovingUser) {
      await removeCurrentUser()
    } else {
      await removeCurrentAccount()
    }
  }

  const renderButtons = () => {
    if (userHasOneAccount && !isRemovingUser) {
      return (
        <Button className="profile-remove-modal-one-account-button" onClick={hideModal} variant="primary">
          Entendi
        </Button>
      )
    }

    return (
      <div className="profile-remove-modal-container">
        <Button onClick={hideModal} variant="light">
          Cancelar
        </Button>
        <Button onClick={checkRemove} variant="alert">
          Remover
        </Button>
      </div>
    )
  }

  const renderTitle = () => {
    if (isRemovingUser) {
      return <Title variant="sans-serif">Remoção de usuário</Title>
    }

    return <Title variant="sans-serif">Remoção de conta</Title>
  }

  const accountRemoveDescriptionOptions = useMemo(
    () => ({
      OWNER:
        'Você está prestes a remover sua conta proprietária, tenha em mente que todos os dados, desde mídias até credenciais de sua herança digital e suas conexões com herdeiros, serão perdidas. Se realmente confirma sua ação, clique em "Remover".',

      HEIR:
        'Você está prestes a remover uma conta herdeira, a sua conexão com o proprietário ligado à esta conta será perdida e você não receberá sua herança digital. Se realmente confirma sua ação, clique em "Remover".',
    }),
    []
  )

  const renderDescription = () => {
    const checkRemoveAccount = () => {
      if (userHasOneAccount) {
        return (
          <Text variant="serif">
            Você possui apenas a atual conta de acesso em nosso sistema, se realmente deseja removê-la, você deverá
            deletar seu usuário via esta mesma página de perfil.
          </Text>
        )
      }

      return <Text variant="serif">{accountRemoveDescriptionOptions[accountType]}</Text>
    }

    if (isRemovingUser) {
      return (
        <Text variant="serif">
          Você está removendo o seu usuário, todas as contas associadas a ele, sejam herdeiras ou proprietária, serão
          removidas juntamente. Fique ciente que todos as suas informações de herança e conexões serão perdidas. Se
          realmente confirma sua ação, clique em "Remover".
        </Text>
      )
    }

    return checkRemoveAccount()
  }

  return (
    <div className="profile-remove-modal">
      {renderTitle()}
      {renderDescription()}

      {renderButtons()}
    </div>
  )
}

ProfileRemoveModal.propTypes = {
  isRemovingUser: PropTypes.bool,
}

export { ProfileRemoveModal }
