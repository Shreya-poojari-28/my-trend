import React from 'react'
import './WishList.css'

const EmptyWishes = () => {
  return (
    <div className='empty-wishes d-flex flex-column align-items-center justify-content-center'>
        <span className='empty-heart-icon mb-3'>
            <i className="fa-solid fa-heart-crack"></i>
        </span>
        <p>Your wishlist is empty.</p>
    </div>
  )
}

export default EmptyWishes