import React from 'react'
import { AppProvider } from 'app-providers'
import { Routes } from 'app-router'

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}

export default App
