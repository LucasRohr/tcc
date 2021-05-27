import React from 'react'
import PropTypes from 'prop-types'
import { HeirRow } from '../heir-row/heir-row.component'

import './heirs-list.style.scss'

const HeirsList = ({ heirs, filterHeirs }) => {
  const rowElements = ['', 'nome', 'conta', 'e-mail', 'bens digitais', '']

  const renderHeader = () => rowElements.map(element => <div className="heirs-list-header-element">{element}</div>)

  const renderListContent = () =>
    heirs.map(({ id, userName, name, email, heritageItemsTotal }) => (
      <HeirRow
        id={id}
        userName={userName}
        email={email}
        heritageItemsTotal={heritageItemsTotal}
        name={name}
        filterHeirs={filterHeirs}
      />
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
