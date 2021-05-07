import React from 'react'
import PropTypes from 'prop-types'

import { Button, Title, Text } from 'app-components'
import { noopFunction } from 'app-helpers'

import './accounts-modal-content.style.scss'

export const AccountsModalContent = ({ onClick }) => {
  return (
    <div className="accounts-help-container">
      <Title variant="sans-serif">O que são usuários e contas?</Title>

      <Text variant="serif">
        Você registra apenas um usuário ao se cadastrar na plataforma, este usuário
        pode possuir diversas contas.<br/><br/>

        É possível ter uma conta do tipo "Proprietário Digital" e
        diversas do tipo "Herdeiro".<br/><br/>

        Ao criar um usuário sem acessar a tela de registro por convite,
        você está criando uma conta Proprietária como sua primeira conta.<br/>
        Nela, você poderá adicionar itens na sua herança digital e definir seus herdeiros.<br/><br/>

        Acessando esta tela de registro através de um convite de herdeiro,
        você estará criando sua primeira conta como sendo do tipo Herdeiro, que irá receber bens de um proprietário.<br/>
      </Text>

      <Button onClick={onClick} className="home-help-button" variant="primary">
        Entendi
      </Button>
    </div>
  )
}

AccountsModalContent.propTypes = {
  onClick: PropTypes.func,
}

AccountsModalContent.defaultProps = {
  onClick: noopFunction,
}

