import React from 'react'
import { Text, Button } from 'app-components'
import { useRoute } from 'app-hooks'

import './final-step.style.scss'

const FinalStep = () => {
  const { goToLogin } = useRoute()

  return (
    <div className="register-final-step-container">
      <Text>Clique abaixo para ser direcionado para o login</Text>
      <Button onClick={goToLogin} variant="primary">
        Acessar
      </Button>
    </div>
  )
}

export { FinalStep }
