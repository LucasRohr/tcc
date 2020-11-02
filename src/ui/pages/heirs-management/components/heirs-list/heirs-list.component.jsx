import React from 'react'
import PropTypes from 'prop-types'
import { HeirRow } from '../heir-row/heir-row.component'

import './heirs-list.style.scss'

const HeirsList = ({ heirs }) => {
  const rowElements = ['', 'nome', 'conta', 'e-mail', 'heranças', '']

  const renderHeader = () => rowElements.map(element => <div className="heirs-list-header-element">{element}</div>)

  const renderListContent = () =>
    heirs.map(({ id, name, accountName, email, heritageItemsTotal }) => (
      <HeirRow id={id} name={name} email={email} heritageItemsTotal={heritageItemsTotal} accountName={accountName} />
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
