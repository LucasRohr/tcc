import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import './credential-info.style.scss'

const DEFAULT_PASSWORD = 'defaultPassword'
const DEFAULT_VARIANT = 'DEFAULT'

const NO_INFO_TEXT = 'Informação não definida'

const CredentialInfo = ({ text, variant, isHeirAccount }) => {
  const renderPasswordInfo = () => (
    <div className="credential-info-password-container">
      <input className="credential-info-password" type="password" value={DEFAULT_PASSWORD} disabled />
    </div>
  )

  const INFO_OPTIONS = useMemo(
    () => ({
      DEFAULT: <div className="credential-info-default">{text || NO_INFO_TEXT}</div>,

      PASSWORD: renderPasswordInfo(),

      AREA: <div className="credential-info-area">{text || NO_INFO_TEXT}</div>,
    }),
    []
  )

  return INFO_OPTIONS[variant]
}

CredentialInfo.defaultProps = {
  variant: DEFAULT_VARIANT,
  isHeirAccount: false,
}

CredentialInfo.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
  isHeirAccount: PropTypes.bool,
}

export { CredentialInfo }
