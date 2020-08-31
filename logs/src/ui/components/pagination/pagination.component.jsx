import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { noopFunction } from 'app-helpers'
import { ArrowLeftIcon, ArrowRightIcon } from 'app-icons'

import './pagination.style.scss'

const ELLIPSIS = '...'

const handleUnusedEllipsis = pages =>
  pages
    .filter(item => !!item)
    .map((item, index) => {
      const prev = pages[index - 1]
      const next = pages[index + 1]
      if (item !== ELLIPSIS || [prev, next].some(item => item === ELLIPSIS || !item)) return item

      const itemNum = prev + 1
      const excatlyBetweenPrevAndNext = itemNum - prev === 1 && next - itemNum === 1
      return excatlyBetweenPrevAndNext ? itemNum : item
    })

const arrayRange = (start, end) => {
  return Array.from({ length: end - start }, (v, k) => k + start)
}

const mountPagination = (currentPage, total) => {
  const initialPage = 1
  const isAtBegin = currentPage <= initialPage + 3
  const isAtEnd = currentPage >= total - 3

  const rangeMin = isAtBegin ? 2 : isAtEnd ? total - 4 : currentPage - 1
  const rangeMax = isAtBegin ? 5 : isAtEnd ? total : currentPage + 1
  const middleNumbers = [...arrayRange(rangeMin, rangeMax), rangeMax].filter(n => n > 1 && n <= total)

  const pages = [
    initialPage,
    middleNumbers[0] - initialPage > 1 ? ELLIPSIS : null,
    ...middleNumbers,
    total - middleNumbers[middleNumbers.length - 1] >= 2 ? ELLIPSIS : null,
    total > middleNumbers[middleNumbers.length - 1] ? total : null,
  ]

  return handleUnusedEllipsis(pages)
}

const Pagination = ({ paginationConfig, showPagination, onChange, additionalClass }) => {
  const { total, currentPage, isFirstPage, isLastPage } = paginationConfig

  const changePage = page => {
    onChange(page)
  }

  const getItemClass = item => (currentPage === item ? 'pagination-page-active' : 'pagination-page')
  const pages = useMemo(() => mountPagination(currentPage, total), [total, currentPage])

  const renderPages = useMemo(
    () =>
      pages.map((item, key) => (
        <li key={key}>
          {item === ELLIPSIS ? (
            <span className="pagination-page">...</span>
          ) : (
            <button className={getItemClass(item)} onClick={() => changePage(item)}>
              {item}
            </button>
          )}
        </li>
      )),
    [pages, onChange]
  )

  return showPagination ? (
    <div className={additionalClass}>
      <ul className="pagination">
        <li>
          <button className="pagination-arrow" onClick={() => changePage(currentPage - 1)} disabled={isFirstPage}>
            <ArrowLeftIcon />
          </button>
        </li>
        {renderPages}
        <li>
          <button className="pagination-arrow" onClick={() => changePage(currentPage + 1)} disabled={isLastPage}>
            <ArrowRightIcon />
          </button>
        </li>
      </ul>
    </div>
  ) : null
}

Pagination.propTypes = {
  paginationConfig: PropTypes.object.isRequired,
  showPagination: PropTypes.bool,
  onChange: PropTypes.func,
  additionalClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Pagination.defaultProps = {
  onChange: noopFunction,
  additionalClass: '',
}

export { Pagination }
