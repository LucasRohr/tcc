import React from 'react'
import { AppProvider } from 'app-providers'
import { LogsSearch } from 'app-pages'
import { Loader, Toast } from 'app-components'
import 'app-styles/main.scss'

function App() {
  return (
    <AppProvider>
      <Toast />
      <Loader />
      <LogsSearch />
    </AppProvider>
  )
}

export default App
