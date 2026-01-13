import React from 'react';
import './WishList.css';
import { useNavigate } from 'react-router-dom';

const EmptyWishes = () => {
  const navigate = useNavigate()
  return (
    <div className="empty-wishes-container d-flex flex-column align-items-center justify-content-center">
      <div className="heart-animation mb-4">
        <i className="fa-solid fa-heart-crack"></i>
      </div>
      <h2 className="fade-in-text mb-2">Your wishlist is empty</h2>
      <p className="fade-in-text delay-1">
        Start exploring products and add your favorites here!
      </p>
      <button className="explore-btn fade-in-text delay-2" onClick={() => navigate('/home')}>
        Explore Products
      </button>
    </div>
  );
};

export default EmptyWishes;
