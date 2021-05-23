import React from 'react'
import PropTypes from 'prop-types'
import { UserIcon, DeleteIcon } from 'app-icons'
import { useModal } from 'app-hooks'
import { RemoveHeirModalContent } from 'app-components'
import { HeritagesManagementModalContent } from '../heritages-management-modal-content/heritages-management-modal-content.component'

import './heir-row.style.scss'

const HeirRow = ({ id, userName, name, email, heritageItemsTotal, filterHeirs }) => {
  const { showModal } = useModal()

  const renderRemoveHeirModal = () => {
    showModal({
      content: <RemoveHeirModalContent heirId={id} onRemove={filterHeirs} />,
    })
  }

  const showHeritagesManagementModal = () => {
    showModal({
      content: <HeritagesManagementModalContent heirId={id} />,
    })
  }

  return (
    <div className="heir-row-container">
      <div>
        <UserIcon />
      </div>

      <div>
        <UserIcon />
        {userName}
      </div>

      <div>
        <span className="heir-row-heading">
          Conta
        </span>
        {name}
      </div>

      <div>
        <span className="heir-row-heading">
          E-mail
        </span>
        {email}
      </div>

      <div 
        onClick={showHeritagesManagementModal}
      >
        <span className="heir-row-heading">
          Bens digitais
        </span>
        {heritageItemsTotal || 0}
      </div>

      <div onClick={renderRemoveHeirModal}>
        <span>Remover</span>
        <DeleteIcon />
      </div>
    </div>
  )
}

HeirRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  accountName: PropTypes.string,
  email: PropTypes.string,
  heritageItemsTotal: PropTypes.number,
}

export { HeirRow }
