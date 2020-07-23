import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './private.route'
import { PublicRoute } from './public.route'
import { routes } from 'app-constants'
import { NotFound } from 'app-pages'
import { useHistory } from 'app-hooks'

export const Routes = () => {
  const { history } = useHistory()

  const mapRoutes = () => {
    return routes.map((route, key) =>
      route.isPublic ? <PublicRoute key={key} exact {...route} /> : <PrivateRoute key={key} exact {...route} />
    )
  }

  return (
    <Router history={history}>
      <Switch>
        {mapRoutes()}
        <Route exact component={NotFound} />
      </Switch>
    </Router>
  )
}
