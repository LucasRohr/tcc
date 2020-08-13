import React from 'react'
import PropTypes from 'prop-types'
import { HeirRow } from '../heir-row/heir-row.component'

import './heirs-list.style.scss'

const HeirsList = ({ heirs }) => {
  const rowElements = ['', 'nome', 'e-mail', 'heranças', 'status', '']

  const renderHeader = () => rowElements.map(element => <div className="heirs-list-header-element">{element}</div>)

  const renderListContent = () =>
    heirs.map(({ id, name, email, heritageItems, status }) => (
      <HeirRow id={id} name={name} email={email} heritageItems={heritageItems} status={status} />
    ))

  return (
    <div className="heirs-list-container">
      <div className="heirs-list-header-container">{renderHeader()}</div>

      <div className="heirs-list-content">{renderListContent()}</div>
    </div>
  )
}

HeirsList.propTypes = {
  heirs: PropTypes.arrayOf(PropTypes.object),
}

export { HeirsList }
