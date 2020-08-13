import React from 'react'
import { AppProvider } from 'app-providers'
import { Routes } from 'app-router'
import { Loader, Modal } from 'app-components'
import './ui/styles/main.scss'
import './ui/styles/variables.scss'

function App() {
  return (
    <AppProvider>
      <Loader />
      <Modal />
      <Routes />
    </AppProvider>
  )
}

export default App
