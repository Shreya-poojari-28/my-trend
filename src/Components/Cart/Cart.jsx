import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart)
  console.log('cart', cartItems);

  return (
    <div>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        cartItems.map((item) => {
          return (
            <CartItem key={item.productId} item={item} />
          )
        })
      )}
    </div>
  )
}

export default Cart