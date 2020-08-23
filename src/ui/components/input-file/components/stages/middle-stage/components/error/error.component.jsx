import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { DeleteIcon } from 'app-icons'

import './error.style.scss'

const Error = ({ multiple, removeFile }) => (
  <Fragment>
    <div className="file-description">
      Arrastar para substituir ou <br />
      <span className="file-highlight">procurar arquivo</span>
    </div>

    {multiple ? <DeleteIcon className="remove-file-icon" onClick={removeFile} /> : null}
  </Fragment>
)

Error.propTypes = {
  removeFile: PropTypes.func,
  multiple: PropTypes.bool,
}

export { Error }
