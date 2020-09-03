import React from 'react'
import { LoadingProvider, ToastAlertProvider } from 'app-hooks'

const AppContext = React.createContext()
const AppConsumer = AppContext.Consumer

const AppProvider = ({ children }) =>
  [LoadingProvider, ToastAlertProvider, AppContext.Provider].reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  )

export { AppProvider, AppConsumer }
