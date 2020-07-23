import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { useLoggedUser, useRoute, usePermission } from 'app-hooks'
import { Header, Container } from 'app-components'
import { PrivatePage, UserNotConfirmed } from 'app-pages'
import { USER_STATUS } from 'app-constants'

const Page = ({ component: Component, role, permissions, ...props }) => {
  const { loggedUser } = useLoggedUser()
  const { goToLogin, goToBegin, setShouldRedirectToOriginalRoute } = useRoute()
  const { hasRole, hasPermission } = usePermission()

  if (loggedUser === null) {
    goToLogin({ redirectedFrom: props.location, internalRedirect: true })

    return null
  }

  if (!loggedUser) return null

  const invalidRole = role && !hasRole(role)
  const invalidPermissions = !permissions.every(permission => hasPermission(permission))

  if (invalidRole || invalidPermissions) {
    goToBegin()
    return null
  }

  if (loggedUser.status === USER_STATUS.WAITING_ACTIVATION) {
    return <UserNotConfirmed {...props} />
  }

  setShouldRedirectToOriginalRoute(false)

  return (
    <Fragment>
      <Header />
      <PrivatePage {...props}>
        <Container>
          <Component {...props} />
        </Container>
      </PrivatePage>
    </Fragment>
  )
}

Page.defaultProps = {
  permissions: [],
}

export const PrivateRoute = ({ component, role, permissions, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Page component={component} role={role} permissions={permissions} {...props} {...rest} />
        </>
      )}
    />
  )
}
