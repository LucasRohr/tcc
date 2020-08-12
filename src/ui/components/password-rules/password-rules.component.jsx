import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { passwordValidations } from 'app-validators'

import './password-rules.style.scss'

const PasswordRules = ({ classes, value }) => {
  const mountRuleClass = rule => (rule(value) ? 'password-rules-item-completed' : 'password-rules-item')

  const { hasLowercaseLetter, hasCapitalLetter, hasOneNumber, between6And100Characters } = passwordValidations

  return (
    <Fragment>
      <ul className="password-rules-list">
        <li className={mountRuleClass(hasLowercaseLetter)}>Uma letra minúscula</li>
        <li className={mountRuleClass(hasCapitalLetter)}>Uma letra maiúscula</li>
        <li className={mountRuleClass(hasOneNumber)}>Um número</li>
        <li className={mountRuleClass(between6And100Characters)}>6 a 100 caracteres</li>
      </ul>
    </Fragment>
  )
}

PasswordRules.propTypes = {
  value: PropTypes.string,
}

export { PasswordRules }
