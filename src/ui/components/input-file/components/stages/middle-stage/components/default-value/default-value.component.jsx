import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { DeleteIcon } from 'app-icons'

import './default-value.style.scss'

const DefaultValue = ({ removeFile }) => (
  <Fragment>
    <div className="file-description">
      Arrastar para substituir <br />
      ou <span className="file-highlight">procurar arquivo</span>
    </div>

    <DeleteIcon className="remove-file-icon" onClick={removeFile} />
  </Fragment>
)

DefaultValue.propTypes = {
  removeFile: PropTypes.func,
}

export { DefaultValue }
