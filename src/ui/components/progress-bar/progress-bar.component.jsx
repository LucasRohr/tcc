import React from 'react'
import PropTypes from 'prop-types'

import './progress-bar.style.scss'

const ProgressBar = ({ currentStep, totalSteps }) => {
  const getProgressPartClass = step => (step <= currentStep ? 'progress-bar-step-filled' : 'progress-bar-step-empty')
  const stepWidth = `${100 / totalSteps}%`

  const getStepBorder = step => {
    if (step === 1) {
      return '6px 0 0 6px'
    }

    if (step === totalSteps) {
      return '0 6px 6px 0'
    }
  }

  const renderProgress = () => {
    const steps = []

    for (let i = 0; i < totalSteps; i++) {
      steps.push(i + 1)
    }

    return steps.map((step, key) => (
      <div
        key={key}
        style={{ width: stepWidth, borderRadius: getStepBorder(step) }}
        className={getProgressPartClass(step)}
      />
    ))
  }

  return <div className="progress-bar-container">{renderProgress()}</div>
}

ProgressBar.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
}

export { ProgressBar }
