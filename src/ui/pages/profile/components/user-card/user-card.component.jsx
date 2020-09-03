import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'app-components'
import { DateHelper } from 'app-helpers'
import { DATE_FORMAT } from 'app-constants'
import { UserIcon } from 'app-icons'
import { CPFFormatter } from 'app-formatters'
import { useModal } from 'app-hooks'
import { ProfileRemoveModal } from '../profile-remove-modal/profile-remove-modal.component'
import { UserEditForm } from '../user-edit-form/user-edit-form.component'
import { PasswordEditForm } from '../password-edit-form/password-edit-form.component'

import './user-card.style.scss'

const CARD_CONTENTS = {
  DEFAULT: 'DEFAULT',
  EDIT_FORM: 'EDIT_FORM',
  PASSWORD_FORM: 'PASSWORD_FORM',
}

const UserCard = ({ email, cpf, name, accountsTotal, birthday }) => {
  const [currentCardContent, setCurrentCardContent] = useState(CARD_CONTENTS.DEFAULT)

  const { showModal } = useModal()

  const formattedDate = DateHelper.fromUTC(birthday).format(DATE_FORMAT)
  const formattedCpf = CPFFormatter(cpf)

  const renderUserInfo = () => (
    <div className="profile-user-card-info-container">
      <Text className="profile-user-card-text--light" variant="sans-serif">
        Dados de usuário
      </Text>

      <div className="profile-user-card-middle-content">
        <div>
          <Text variant="sans-serif">{name}</Text>
          <Text variant="sans-serif">{email}</Text>
          <Text variant="sans-serif">{formattedCpf}</Text>
        </div>

        <Text className="profile-user-card-account" variant="sans-serif">
          <Text className="profile-user-card-text--highlight" variant="sans-serif">
            {accountsTotal}
          </Text>{' '}
          contas criadas
        </Text>
      </div>

      <Text className="profile-user-card-text--light" variant="sans-serif">
        Nascimento: <Text>{formattedDate}</Text>
      </Text>
    </div>
  )

  const showRemoveUserModal = () => {
    showModal({
      content: <ProfileRemoveModal isRemovingUser />,
    })
  }

  const renderRightContent = () => (
    <div className="profile-user-card-right-content">
      <UserIcon className="profile-user-card-icon" />

      <div className="profile-user-card-buttons-container">
        <Button onClick={showRemoveUserModal} variant="alert">
          Deletar usuário
        </Button>

        <Button onClick={() => setCurrentCardContent(CARD_CONTENTS.EDIT_FORM)} variant="primary">
          Editar
        </Button>
      </div>
    </div>
  )

  const renderDefaultContent = () => (
    <>
      {renderUserInfo()}
      {renderRightContent()}
    </>
  )

  const cardContentOptions = useMemo(
    () => ({
      DEFAULT: {
        component: renderDefaultContent,
        props: {},
      },

      EDIT_FORM: {
        component: UserEditForm,
        props: {
          initialData: { name, email, cpf: formattedCpf, birthday: formattedDate },
          setCurrentCardContent,
        },
      },

      PASSWORD_FORM: {
        component: PasswordEditForm,
        props: {
          setCurrentCardContent,
        },
      },
    }),
    []
  )

  const renderContent = () => {
    const CardComponent = cardContentOptions[currentCardContent].component
    const props = cardContentOptions[currentCardContent].props

    return <CardComponent {...props} />
  }

  return <div className="profile-user-card-container">{renderContent()}</div>
}

UserCard.defaultProps = {
  accountsTotal: 0,
}

UserCard.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  cpf: PropTypes.string,
  accountsTotal: PropTypes.number,
  heirsTotal: PropTypes.number,
  birthday: PropTypes.object,
}

export { UserCard }
