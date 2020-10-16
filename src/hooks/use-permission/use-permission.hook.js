import { useLoggedUser } from '../use-logged-user/use-logged-user.hook'
import { ROLES } from 'app-constants'

const usePermission = () => {
  const { loggedUser } = useLoggedUser()

  const isSameRole = (roleToCheck, role) => role === roleToCheck

  const isOwnerRole = role => role && isSameRole(role, ROLES.OWNER)

  const withUserType = (Component, type) => {
    return loggedUser && isSameRole(loggedUser.currentAccount.type, type) ? Component : null
  }

  const withOwnerRole = Component => {
    return withUserType(Component, ROLES.OWNER)
  }

  const withHeirRole = Component => {
    return withUserType(Component, ROLES.HEIR)
  }

  const hasRole = role => {
    if (role) {
      return loggedUser && isSameRole(loggedUser.currentAccount.type, role)
    }

    return true
  }

  const hasOwnerRole = () => {
    return hasRole(ROLES.OWNER)
  }

  const hasHeirRole = () => {
    return hasRole(ROLES.HEIR)
  }

  const hasPermission = permission => {
    if (!loggedUser) return false

    const accountPermissions = loggedUser.currentAccount ? loggedUser.currentAccount.permissions : []
    return !!accountPermissions.find(availablePermission => availablePermission === permission)
  }

  return {
    isOwnerRole,
    withOwnerRole,
    withHeirRole,
    hasRole,
    hasOwnerRole,
    hasHeirRole,
    hasPermission,
  }
}

export { usePermission }
