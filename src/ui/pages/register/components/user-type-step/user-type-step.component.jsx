import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { RegisterUserIcon } from 'app-icons'
import { Title, Text, Button } from 'app-components'

import './user-type-step.style.scss'

const UserTypeStep = ({ firstAccountType, increaseStep }) => {
  const userTypeOptions = useMemo(
    () => ({
      OWNER: {
        title: 'Proprietário',
        message:
          'Ao criar um perfil de usuário sem um convite de herdeiro, você estará criando sua primeira conta como um Proprietário Digital.',
      },

      HEIR: {
        title: 'Herdeiro',
        message:
          'Ao criar um perfil de usuário com um convite de herdeiro, você estará criando sua primeira conta como herdeiro de um proprietário. Você pode criar sua própria conta proprietária quando quiser.',
      },
    }),
    []
  )

  return (
    <div className="register-user-type-container">
      <div className="register-user-type-title-container">
        <Title variant="sans-serif">Registro</Title>
        <Text>{userTypeOptions[firstAccountType].title}</Text>
      </div>

      <div className="register-user-type-content">
        <RegisterUserIcon className="register-user-type-icon" />

        <Text variant="serif">{userTypeOptions[firstAccountType].message}</Text>
      </div>

      <Button onClick={increaseStep} variant="primary">
        Continuar
      </Button>
    </div>
  )
}

UserTypeStep.propTypes = {
  firstAccountType: PropTypes.string,
  increaseStep: PropTypes.func,
}

export { UserTypeStep }
