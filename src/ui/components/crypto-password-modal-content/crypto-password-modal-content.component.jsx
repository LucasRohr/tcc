import React from 'react'
import { Button, Title, Text } from 'app-components'
import { noopFunction } from 'app-helpers'
import PropTypes from 'prop-types'

import './crypto-password-modal-content.style.scss'

export const CryptoPasswordModalContent = ({ onClick }) => {
  return (
    <div className="crypto-password-help-container">
      <Title variant="sans-serif">O que é a senha de segurança?</Title>
      <Text variant="serif">
        Esta senha tem a funcionalidade de aprimorar a criptografia de seus dados que é realizada por toda a plataforma.
        <br />
        <br />Ao inserir este dado, você está garantindo uma proteção ainda mais completa de seus bens digitais.
        <br />
        <br />Recomendamos que ela seja diferente de usa senha de usuário.
      </Text>

      <Button onClick={onClick} className="home-help-button" variant="primary">
        Entendi
      </Button>
    </div>
  )
}

CryptoPasswordModalContent.propTypes = {
  onClick: PropTypes.func,
}

CryptoPasswordModalContent.defaultProps = {
  onClick: noopFunction,
}

