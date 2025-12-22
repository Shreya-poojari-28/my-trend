import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token")

  if (!token) {
    sessionStorage.clear()
    return <Navigate to="/" replace />
  }

  return (
    <div className="app-layout">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PrivateRoutes
