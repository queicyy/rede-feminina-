import React from 'react'
import { Route } from 'react-router'
import MainPage from '../pages/mainPage/mainPage'


const AppRoutes: React.FC = () => {
  return (
    <>
      {/* dashboard */}
      <Route path='/' exact={true}>
        <MainPage />
      </Route>
    </>
  )
}

export default AppRoutes
