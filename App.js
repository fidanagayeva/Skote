import React from 'react'
import './style/style.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routers'

const App = () => {
  return (
    <RouterProvider
    router={routes}
    // fallbackElement={<BigSpinner />}
  />
  )
}

export default App