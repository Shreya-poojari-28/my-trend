import React from 'react'
import MyTrendsLogo from '../../assets/logo.svg';
import './Header.css'

const Header = () => {
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
        </div>
      </div>
    </div>
  )
}

export default Header