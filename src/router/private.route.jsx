import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useLoggedUser, useRoute, usePermission, useToastAlert } from 'app-hooks'
import { Header, Container, Toast } from 'app-components'
import { PrivatePage } from 'app-pages'

const Page = ({ component: Component, role, permissions, ...props }) => {
  const { loggedUser } = useLoggedUser()
  const { goToLogin, goToBegin, setShouldRedirectToOriginalRoute } = useRoute()
  const { hasRole } = usePermission()
  const { showErrorToastAlert } = useToastAlert()

  useEffect(() => {
    if (loggedUser === null) {
      goToLogin({ redirectedFrom: props.location, internalRedirect: true })
    }
  }, [loggedUser])

  if (loggedUser === null || !loggedUser) return null

  const invalidRole = !hasRole(role)

  if (invalidRole) {
    showErrorToastAlert('Você não tem permissão para acessar este recurso.')
    goToBegin()
    return null
  }

  setShouldRedirectToOriginalRoute(false)

  const checkRender = () => {
    const hasNoLoggedUser = loggedUser === null || !loggedUser

    if (hasNoLoggedUser) {
      return null
    }

    return (
      <Fragment>
        <Header />
        <Toast />
        <PrivatePage {...props}>
          <Container>
            <Component {...props} />
          </Container>
        </PrivatePage>
      </Fragment>
    )
  }

  return checkRender()
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
