import React from 'react'
import PropTypes from 'prop-types'
import { UserIcon, DeleteIcon } from 'app-icons'
import { useModal } from 'app-hooks'
import { RemoveHeirModalContent } from 'app-components'
import { HeritagesManagementModalContent } from '../heritages-management-modal-content/heritages-management-modal-content.component'

import './heir-row.style.scss'

const HeirRow = ({ id, name, accountName, email, heritageItemsTotal }) => {
  const { showModal } = useModal()

  const renderRemoveHeirModal = () => {
    showModal({
      content: <RemoveHeirModalContent heirId={id} />,
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

      <div>{name}</div>

      <div>{accountName}</div>

      <div>{email}</div>

      <div onClick={showHeritagesManagementModal}>{heritageItemsTotal || 0}</div>

      <div onClick={renderRemoveHeirModal}>
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
