import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './LandingPage'
import Refactoring from './refactoring'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/refactor',
    element: < Refactoring />
  },

])

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
