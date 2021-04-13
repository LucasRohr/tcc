import React from 'react';

import { useCryptoPasswordValidation } from './crypto-password-validation-hook';

import './crypto-password-validation.style.scss'

const CryptoPasswordValidation = () => {
  const { renderFields, buildApiObject, isValid } = useCryptoPasswordValidation()
}

export { CryptoPasswordValidation }