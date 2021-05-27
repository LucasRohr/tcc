import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { noopFunction } from 'app-helpers'
import { EyeIcon } from 'app-icons'

import './credential-info.style.scss'

const DEFAULT_PASSWORD = 'defaultPassword'
const DEFAULT_VARIANT = 'DEFAULT'

const NO_INFO_TEXT = 'Informação não definida'

const INPUT_TYPES = {
  TEXT: 'text',
  PASSWORD: 'password',
}

const CredentialInfo = ({ text, variant, getCredentialPassword }) => {
  const [inputType, setInputType] = useState(INPUT_TYPES.PASSWORD)

  const renderPasswordInfo = () => {
    const onIconClick = async () => {
      const result = await getCredentialPassword()

      if (result) {
        if (inputType === INPUT_TYPES.PASSWORD) {
          setInputType(INPUT_TYPES.TEXT)
        } else {
          setInputType(INPUT_TYPES.PASSWORD)
        }
      }
    }

    return (
      <div className="credential-info-password-container">
        <input className="credential-info-password" type={inputType} value={text || DEFAULT_PASSWORD} disabled />
        <EyeIcon onClick={onIconClick} className="redential-info-password-icon" />
      </div>
    )
  }

  const INFO_OPTIONS = useMemo(
    () => ({
      DEFAULT: <div className="credential-info-default">{text || NO_INFO_TEXT}</div>,

      PASSWORD: renderPasswordInfo(),

      AREA: <div className="credential-info-area">{text || NO_INFO_TEXT}</div>,
    }),
    [inputType, text]
  )

  return INFO_OPTIONS[variant]
}

CredentialInfo.defaultProps = {
  variant: DEFAULT_VARIANT,
  getCredentialPassword: noopFunction,
}

CredentialInfo.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
  getCredentialPassword: PropTypes.func,
}

export { CredentialInfo }
