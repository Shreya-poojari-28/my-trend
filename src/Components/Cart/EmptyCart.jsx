import React, { useContext } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider';

const EmptyCart = () => {
  const { theme } = useContext(ThemeProvider);

  return (
    <div className={`empty-cart-container ${theme}`}>
      <div className="empty-cart-animation">
        <div className="empty-cart">
          <div className="wheel wheel-left"></div>
          <div className="wheel wheel-right"></div>
        </div>
      </div>
      <h2 className="empty-text">Your Cart is Empty</h2>
      <p className="empty-subtext">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link to="/home" className="shop-now-btn">
        <i class="fa-solid fa-cart-shopping"></i> Shop Now
      </Link>
    </div>
  );
};

export default EmptyCart;
