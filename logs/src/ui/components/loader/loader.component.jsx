import React from 'react'
import './loader.style.scss'
import { useLoading } from 'app-hooks'
import { LogoReverseIcon } from 'app-icons'

const Loader = () => {
  const { isLoading } = useLoading()

  if (!isLoading) {
    return null
  }

  return (
    <div className="loader">
      <LogoReverseIcon className="app-loader-icon" />
    </div>
  )
}

export { Loader }
