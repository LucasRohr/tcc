import React from 'react'
import PropTypes from 'prop-types'
import { EmptyContent } from 'app-components'
import { InviteRow } from '../invite-row/invite-row.component'

import './invites-list.style.scss'

const InvitesList = ({ invites, loadInvites }) => {
  const renderList = () => {
    const hasInvites = invites && invites.length

    if (hasInvites) {
      return invites.map(invite => <InviteRow invite={invite} loadInvites={loadInvites} />)
    }

    return (
      <EmptyContent
        className="invites-list-empty-content"
        mainMessage="Não existem convites de herdeiro para serem exibidos."
        additionalMessage="Volte novamente mais tarde"
      />
    )
  }

  return <div className="invites-list-container">{renderList()}</div>
}

InvitesList.defaultProps = {
  invites: [],
}

InvitesList.propTypes = {
  invites: PropTypes.arrayOf(PropTypes.object),
  loadInvites: PropTypes.func,
}

export { InvitesList }
