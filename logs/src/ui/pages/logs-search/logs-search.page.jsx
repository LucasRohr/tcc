import React, { useState, useEffect } from 'react'
import { Header, Pagination } from 'app-components'
import { useLogs } from 'app-hooks'
import { Filters, LogsList } from './components'

import './logs-search.style.scss'

const FIRST_PAGE = 1

const LogsSearch = () => {
  const [logs, setLogs] = useState([])
  const [filters, setFilters] = useState({ filterText: '', fromDate: null, toDate: null })
  const [paginationConfig, setPaginationConfig] = useState({
    total: null,
    currentPage: FIRST_PAGE - 1,
    isFirstPage: false,
    isLastPage: false,
  })

  const { getApplicationLogs } = useLogs()

  const setResultAndHandlePagination = result => {
    const resultPaginationConfig = {
      total: result.totalPages,
      currentPage: result.number + 1,
      isFirstPage: result.first,
      isLastPage: result.last,
    }

    setPaginationConfig(resultPaginationConfig)
    setLogs(result.content)
  }

  const getLogs = async (page = FIRST_PAGE) => {
    const logsFilterObject = {
      ...filters,
      page: page - 1,
    }

    const result = await getApplicationLogs(logsFilterObject)

    if (result) {
      setResultAndHandlePagination(result)
    }
  }

  useEffect(() => {
    getLogs(FIRST_PAGE - 1)
  }, [filters])

  return (
    <div className="logs-search-container">
      <Header />
      <div className="logs-search-content">
        <Filters setFilters={setFilters} />

        <LogsList logs={logs} />

        <Pagination
          onChange={getLogs}
          paginationConfig={paginationConfig}
          additionalClass="logs-pagination-container"
          showPagination={logs && logs.length}
        />
      </div>
    </div>
  )
}

export { LogsSearch }
