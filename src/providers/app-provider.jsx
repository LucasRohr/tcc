import React from 'react'
import { GoBackProvider, LoggedUserProvider, OriginalRouteRedirectProvider } from 'app-hooks'

const AppContext = React.createContext()
const AppConsumer = AppContext.Consumer

const AppProvider = ({ children }) =>
  [GoBackProvider, LoggedUserProvider, OriginalRouteRedirectProvider, AppContext.Provider].reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  )

export { AppProvider, AppConsumer }
