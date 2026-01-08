import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import { ThemeProvider } from '../Contexts/ThemeProvider/ThemeProvider.jsx'

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token")

  if (!token) {
    sessionStorage.clear()
    return <Navigate to="/" replace />
  }

  const themeData = useContext(ThemeProvider)
  const theme = themeData.theme;

  return (
    <div
      className="app-layout"
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#27292B",
        color: theme === "light" ? "#000000" : "#FFFFFF",
      }}
    >
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PrivateRoutes
