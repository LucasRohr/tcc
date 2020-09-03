import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DateHelper } from 'app-helpers'
import { DATE_HOUR_FORMAT } from 'app-constants'
import { DropdownIcon } from 'app-icons'

import './log-row.style.scss'

const LogRow = ({ log }) => {
  const [isClosed, setIsClosed] = useState(false)
  const logJson = isClosed ? JSON.stringify(log.info) : JSON.stringify(log.info, undefined, 4)

  const conditionalArrowClass = useMemo(() => (isClosed ? 'log-row-arrow-down' : 'log-row-arrow-up'), [isClosed])

  return (
    <div className="log-row-container">
      <div className="log-row-date-container">{DateHelper.fromUTC(log.date).format(DATE_HOUR_FORMAT)}</div>

      <div className="log-row-content">
        <pre>{logJson}</pre>
      </div>

      <DropdownIcon className={conditionalArrowClass} onClick={() => setIsClosed(!isClosed)} />
    </div>
  )
}

LogRow.propTypes = {
  log: PropTypes.string,
}

export { LogRow }
