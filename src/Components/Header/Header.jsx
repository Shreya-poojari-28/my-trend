import React, { useContext } from 'react'
import MyTrendsLogo from '../../assets/logo.svg';
import './Header.css'
import { ThemeProvider } from '../../ThemeProvider/ThemeProvider';

const Header = () => {
  const themeData = useContext(ThemeProvider)
  const theme = themeData.theme;
  const setTheme = themeData.setTheme;

  return (
    <div className="header px-5">
      <div className="header-container d-flex justify-content-between align-items-center">
        <div className="logo header-left">
          <img src={MyTrendsLogo} alt="My Trends Logo" />
        </div>

        <div className="header-right d-flex align-items-center gap-5">
          <div className="wishList">
            <i className="fa-solid fa-heart"></i>
            <span className="count">2</span>
          </div>
          <div className="cart">
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="count">4</span>
          </div>
          <div className={`theme ${theme}`}>
            <div
              className="inner-theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light"
                ? <i className="fa-solid fa-moon"></i>
                : <i className="fa-solid fa-sun"></i>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header