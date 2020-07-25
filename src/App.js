import React from 'react'
import { AppProvider } from 'app-providers'
import { Routes } from 'app-router'
import { Loader } from 'app-components'
import './ui/styles/main.scss'
import './ui/styles/variables.scss'

function App() {
  return (
    <AppProvider>
      <Loader />
      <Routes />
    </AppProvider>
  )
}

export default App
