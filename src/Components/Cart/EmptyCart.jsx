import React from 'react'
import './Cart.css'

const EmptyCart = () => {
  return (
    <div className='empty-wishes d-flex flex-column align-items-center justify-content-center'>
      <span className='empty-cart-icon mb-3'>
        <i class="fa-solid fa-cart-shopping"></i>
      </span>
      <p>Your cart is empty.</p>
    </div>
  )
}

export default EmptyCart