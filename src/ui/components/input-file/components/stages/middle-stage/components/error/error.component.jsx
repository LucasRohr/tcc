import React, { Fragment } from 'react'

import './error.style.scss'

const Error = () => (
  <Fragment>
    <div className="file-description">
      Arrastar para substituir <br />
      ou <span className="file-highlight">procurar arquivo</span>
    </div>
  </Fragment>
)

export { Error }
