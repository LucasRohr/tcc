import React from 'react'
import PropTypes from 'prop-types'
import { UserIcon, DeleteIcon } from 'app-icons'
import { useModal } from 'app-hooks'

import './heir-row.style.scss'
import { RemoveHeirModalContent } from '../remove-heir-modal-content/remove-heir-modal-content.component'
import { HeritagesManagementModalContent } from '../heritages-management-modal-content/heritages-management-modal-content.component'

const HeirRow = ({ id, name, account, email, heritageItems }) => {
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

      <div>{account}</div>

      <div>{email}</div>

      <div onClick={showHeritagesManagementModal}>{heritageItems.length}</div>

      <div onClick={renderRemoveHeirModal}>
        <DeleteIcon />
      </div>
    </div>
  )
}

HeirRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  account: PropTypes.string,
  email: PropTypes.string,
  heritageItems: PropTypes.arrayOf(PropTypes.object),
}

export { HeirRow }
