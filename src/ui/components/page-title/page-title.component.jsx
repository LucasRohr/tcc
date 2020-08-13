import React from 'react'
import PropTypes from 'prop-types'
import { ArrowBackIcon } from 'app-icons'
import { useRoute } from 'app-hooks'
import { Title } from '../title/title.component'

import './page-title.style.scss'

const PageTitle = ({ title }) => {
  const { goBack } = useRoute()

  return (
    <div className="page-title-container">
      <ArrowBackIcon onClick={goBack} className="page-title-arrow-back-icon" />
      <Title variant="sans-serif">{title}</Title>
    </div>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string,
}

export { PageTitle }
