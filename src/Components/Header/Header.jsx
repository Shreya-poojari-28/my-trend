import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import MyTrendsLogo from '../../assets/logo.svg'
import './Header.css'
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider'
import LogoutModal from './LogoutModal'

const Header = () => {
  const { theme, setTheme } = useContext(ThemeProvider)
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  /* -------------------- REDUX -------------------- */
  const cartItems = useSelector((state) => state?.cart || [])
  const wishListItems = useSelector((state) => state?.wishList || [])

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  /* -------------------- HANDLERS -------------------- */
  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [theme, setTheme])

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const closeMenuAndNavigate = (path) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  /* -------------------- EFFECTS -------------------- */

  // Sticky header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header')
      if (!header) return
      header.classList.toggle('scrolled', window.scrollY > 5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)
  }, [isMenuOpen])

  /* -------------------- JSX -------------------- */
  return (
    <>
      <header className="header px-5">
        <div className="header-container d-flex justify-content-between align-items-center">

          {/* Logo */}
          <div
            className="logo cursor-pointer"
            onClick={() => closeMenuAndNavigate('/home')}
          >
            <img src={MyTrendsLogo} alt="My Trends Logo" />
          </div>

          {/* Hamburger */}
          <div
            className="hamburger hamburger-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>

          <div className={`header-right-laptop`}>
            {/* WishList */}
            <div
              className="wishList menu-wishList d-flex gap-4 cursor-pointer"
              onClick={() => closeMenuAndNavigate('/wishlist')}
            >
              <div className="wish-icon laptop">
                <i className="fa-solid fa-heart"></i>
                <span className="count">
                  {wishListItems.length > 0 ? wishListItems.length : ''}
                </span>
              </div>
            </div>

            {/* Cart */}
            <div
              className="cart menu-cart d-flex gap-4 cursor-pointer"
              onClick={() => closeMenuAndNavigate('/cart')}
            >
              <div className="cart-icon laptop">
                <i className="fa-solid fa-bag-shopping"></i>
                <span className="count">
                  {cartItemCount > 0 ? cartItemCount : ''}
                </span>
              </div>
            </div>
            {/* Theme Toggle */}
            <div className={`theme laptop-theme ${theme}`} onClick={handleThemeToggle}>
              <div className="inner-theme">
                {theme === 'light'
                  ? <i className="fa-solid fa-moon"></i>
                  : <i className="fa-solid fa-sun"></i>}
              </div>
            </div>

            {/* Logout */}
            <div
              className="log-out menu-log-out cursor-pointer"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>


        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {isMenuOpen && (
        <div className={`header-right ${isMenuOpen ? 'open' : ''}`}>

          {/* Close */}
          <span className="xmark" onClick={() => setIsMenuOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>

          {/* Wishlist */}
          <div
            className="wishList menu-wishList d-flex gap-4 cursor-pointer"
            onClick={() => closeMenuAndNavigate('/wishlist')}
          >
            <div className="wish-icon laptop">
              <i className="fa-solid fa-heart"></i>
              <span className="count">
                {wishListItems.length > 0 ? wishListItems.length : ''}
              </span>
            </div>
            <div className={`mobile ${isMenuOpen ? 'open' : ''}`}>WishList</div>
          </div>

          {/* Cart */}
          <div
            className="cart menu-cart d-flex gap-4 cursor-pointer"
            onClick={() => closeMenuAndNavigate('/cart')}
          >
            <div className="cart-icon laptop">
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="count">
                {cartItemCount > 0 ? cartItemCount : ''}
              </span>
            </div>
            <div className={`mobile ${isMenuOpen ? 'open' : ''}`}>Cart</div>
          </div>

          {/* Theme Toggle */}
          <div className={`theme ${theme} ${isMenuOpen ? 'open' : ''}`} onClick={handleThemeToggle}>
            <div className="inner-theme">
              {theme === 'light'
                ? <i className="fa-solid fa-moon"></i>
                : <i className="fa-solid fa-sun"></i>}
            </div>
          </div>

          {/* Theme Text */}
          <div
            className={`menu-theme cursor-pointer mobile ${isMenuOpen ? 'open' : ''}`}
            onClick={() => {
              handleThemeToggle()
              setIsMenuOpen(false)
            }}
          >
            {theme === 'light'
              ? <><i className="fa-solid fa-moon me-3"></i> Dark Mode</>
              : <><i className="fa-solid fa-sun me-3"></i> Light Mode</>}
          </div>

          {/* Logout */}
          <div
            className="log-out menu-log-out cursor-pointer d-flex gap-4"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <div className={`mobile ${isMenuOpen ? 'open' : ''}`}>Logout</div>
          </div>

        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          show={showLogoutModal}
          onHide={() => setShowLogoutModal(false)}
        />
      )}
    </>
  )
}

export default Header
