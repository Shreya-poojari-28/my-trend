import React, { useContext, useEffect, useState } from 'react'
import MyTrendsLogo from '../../assets/logo.svg'
import './Header.css'
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutModal from './LogoutModal'

const Header = () => {
  const { theme, setTheme } = useContext(ThemeProvider)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const navigate = useNavigate()

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleLogOut = () => {
    setShowLogoutModal(true)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const cartItem = useSelector((state) => state?.cart || [])
  const cartItemCount = cartItem?.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)
  const wishListItemCount = useSelector((state) => state?.wishList || 0);

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 5) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  return (
    <div className="header px-5">
      <div className="header-container d-flex justify-content-between align-items-center">

        {/* Logo */}
        <div
          className="logo header-left cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <img src={MyTrendsLogo} alt="My Trends Logo" />
        </div>

        {/* Hamburger (Mobile only) */}
        <div
          className="hamburger hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

        {/* Right Menu */}
        <div className={`header-right d-flex align-items-center gap-5 ${isMenuOpen ? 'open' : ''}`}>
          <span
            className="hamburger xmark"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
          <div
            className="wishList d-flex gap-4 cursor-pointer"
            onClick={() => {
              navigate('/wishlist')
              setIsMenuOpen(false)
            }}
          >
            <div className='wish-icon laptop'>
              <i className="fa-solid fa-heart"></i>
              <span className="count">{wishListItemCount?.length > 0 ? wishListItemCount?.length : ''}</span>
            </div>

            <div className={`mobile ${isMenuOpen ? 'open' : ''}`}>
              WishList
            </div>
          </div>

          <div
            className="cart d-flex gap-4 cursor-pointer"
            onClick={() => {
              navigate('/cart')
              setIsMenuOpen(false)
            }}
          >
            <div className="cart-icon laptop">
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="count">{cartItemCount > 0 ? cartItemCount : ''}</span>
            </div>

            <div className={`mobile ${isMenuOpen ? 'open' : ''}`}>
              Cart
            </div>
          </div>

          <div className={`theme ${theme} ${isMenuOpen ? 'open' : ''}`}>
            <div className="inner-theme"
              onClick={() => {
                handleThemeToggle()
              }}

            >
              {theme === 'light'
                ? <i className="fa-solid fa-moon"></i>
                : <i className="fa-solid fa-sun"></i>
              }
            </div>
          </div>

          <div className={`mobile cursor-pointer ${isMenuOpen ? 'open' : ''}`}
            onClick={() => {
              handleThemeToggle()
              setIsMenuOpen(false)
            }}
          >
            {theme === 'light'
              ? <span>
                <i className="fa-solid fa-moon me-4"></i> Dark Mode
              </span>
              : <span>
                <i className="fa-solid fa-sun me-3"></i> Light Mode
              </span>
            }
          </div>

          <div className="log-out cursor-pointer d-flex gap-4" onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>

            <div className={`mobile ${isMenuOpen ? 'open' : ''}`}>
              Logout
            </div>
          </div>
        </div>

      </div>
      {showLogoutModal && (
        <LogoutModal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} />
      )}
    </div>
  )
}

export default Header
