import React, { useState } from 'react';

import { useRoute, useWindowSize } from 'app-hooks'
import { useCryptoPasswordValidation } from './crypto-password-validation-hook';

import './crypto-password-validation.style.scss'

const CryptoPasswordValidation = () => {
  const [errorMessage, setErrorMessage] = useState('')
  
  const { goToHome } = useRoute()
  const { renderFields, buildApiObject, isValid, sendToApi } = useCryptoPasswordValidation()

  const validateCryptoPassword = async () => {
    setErrorMessage('')

    const validationObject = buildApiObject()
    const result = await sendToApi(validationObject)

    if (!result || result?.error) {
      setErrorMessage(result?.error?.message)
    } else {
      localStorage.setItem('cryptoPassword', validationObject.cryptoPassword)
      goToHome()
    }
  }
}

export { CryptoPasswordValidation }