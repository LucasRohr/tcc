import React from 'react'
import { usePermission, useRoute } from 'app-hooks'

const Begin = () => {
  const { hasOwnerRole, hasHeirRole } = usePermission()
  const { goToHomeHeir, goToHomeOwner } = useRoute()

  const checkPermissions = () => {
    const config = { internalRedirect: true }
    hasHeirRole() && goToHomeHeir(config)
    hasOwnerRole() && goToHomeOwner(config)
  }
  return <div>{checkPermissions()}</div>
}

export { Begin }
