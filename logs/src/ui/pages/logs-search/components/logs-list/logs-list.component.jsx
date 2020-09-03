import React from 'react'
import PropTypes from 'prop-types'
import { EmptyContent } from 'app-components'
import { LogRow } from '../log-row/log-row.component'

import './logs-list.style.scss'

const LogsList = ({ logs }) => {
  const renderLogs = () =>
    logs && logs.length ? (
      logs.map(log => <LogRow log={log} />)
    ) : (
      <EmptyContent className="logs-list-empty" mainMessage="Não existem logs para serem listados" />
    )

  return <div className="logs-list-container">{renderLogs()}</div>
}

LogsList.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object),
}

export { LogsList }
