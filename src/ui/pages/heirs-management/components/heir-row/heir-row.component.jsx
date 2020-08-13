import React from 'react'
import PropTypes from 'prop-types'
import { UserIcon, DeleteIcon } from 'app-icons'
import { HEIR_STATUS } from 'app-constants'

import './heir-row.style.scss'

const HeirRow = ({ id, name, email, heritageItems, status }) => {
  return (
    <div className="heir-row-container">
      <div>
        <UserIcon />
      </div>

      <div>{name}</div>

      <div>{email}</div>

      <div>{heritageItems.length}</div>

      <div>{HEIR_STATUS[status]}</div>

      <div>
        <DeleteIcon />
      </div>
    </div>
  )
}

HeirRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  heritageItems: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
}

export { HeirRow }
