import React from 'react'
import { useRoute } from 'app-hooks'

const Begin = () => {
  const { goToHome } = useRoute()

  const checkPermissions = () => {
    const config = { internalRedirect: true }
    goToHome(config)
  }
  return <div>{checkPermissions()}</div>
}

export { Begin }
