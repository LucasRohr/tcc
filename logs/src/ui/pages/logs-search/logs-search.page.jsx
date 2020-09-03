import React, { useState, useEffect } from 'react'
import { Header, Pagination } from 'app-components'
import { useLogs } from 'app-hooks'
import { Filters, LogsList } from './components'

import './logs-search.style.scss'

const FIRST_PAGE = 1

const LogsSearch = () => {
  const [logs, setLogs] = useState([])
  const [filters, setFilters] = useState(null)
  const [paginationConfig, setPaginationConfig] = useState({
    total: null,
    currentPage: FIRST_PAGE,
    isFirstPage: false,
    isLastPage: false,
  })

  const { getApplicationLogs } = useLogs()

  const setResultAndHandlePagination = result => {
    const resultPaginationConfig = {
      total: result.totalPages,
      currentPage: result.currentPage,
      isFirstPage: result.isFirstPage,
      isLastPage: result.isLastPage,
    }

    setPaginationConfig(resultPaginationConfig)
    setLogs(result.data)
  }

  const getLogs = async (page = FIRST_PAGE) => {
    const logsFilterObject = {
      ...filters,
      page,
    }

    const result = await getApplicationLogs(logsFilterObject)

    if (result) {
      setResultAndHandlePagination(logsFilterObject)
    }
  }

  useEffect(() => {
    getLogs(FIRST_PAGE)
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
