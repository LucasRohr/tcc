import React from 'react'
import {
  GoBackProvider,
  LoggedUserProvider,
  OriginalRouteRedirectProvider,
  LoadingProvider,
  ToastAlertProvider,
  ModalProvider,
  WindowSizeProvider,
} from 'app-hooks'

const AppContext = React.createContext()
const AppConsumer = AppContext.Consumer

const AppProvider = ({ children }) =>
  [
    GoBackProvider,
    LoggedUserProvider,
    OriginalRouteRedirectProvider,
    LoadingProvider,
    ToastAlertProvider,
    ModalProvider,
    WindowSizeProvider,
    AppContext.Provider,
  ].reduce((acc, Provider) => <Provider>{acc}</Provider>, children)

export { AppProvider, AppConsumer }
