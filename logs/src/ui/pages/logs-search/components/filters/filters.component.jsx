import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'app-components'
import { useTimeout } from 'app-hooks'
import { useLogFilters } from './filters.hook'

import './filters.style.scss'

const ORDER_OPTIONS = {
  ASCENDANT: {
    key: 'ASC',
    label: 'Crescente',
  },

  DESCENDANT: {
    key: 'DESC',
    label: 'Decrescente',
  },
}

const Filters = ({ setFilters }) => {
  const [orderOption, setOrderOption] = useState(ORDER_OPTIONS.DESCENDANT)

  const { getFilterFields, buildApiObject, fieldsValues } = useLogFilters()
  const { getDebounce } = useTimeout()

  const debounce = useMemo(getDebounce, [])

  const filterLogs = () => {
    const fieldsObject = buildApiObject()
    const filterObject = { order: orderOption.key, ...fieldsObject }

    setFilters(filterObject)
  }

  useEffect(() => {
    debounce(() => {
      filterLogs()
    }, 600)
  }, [orderOption, ...fieldsValues])

  return (
    <div className="log-filters-container">
      <div className="log-filter-fields-container">{getFilterFields()}</div>

      <Switch firstOption={ORDER_OPTIONS.DESCENDANT} secondOption={ORDER_OPTIONS.ASCENDANT} onChange={setOrderOption} />
    </div>
  )
}

Filters.propTypes = {
  setFilters: PropTypes.func,
}

export { Filters }
