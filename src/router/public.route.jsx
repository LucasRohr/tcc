import React from 'react'
import { Route } from 'react-router-dom'

export const PublicRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={props => (
      <>
        <Component {...props} />
      </>
    )}
  />
)
