import React from 'react'
import { useSelector } from 'react-redux'
import WishItem from './WishItem';
import './WishList.css'

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishList)
  // console.log('wishlistItems:', wishlistItems);

  return (
    <div className='d-flex align-items-center justify-content-center gap-2 flex-wrap'>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <WishItem key={item.productId} {...item} />
        ))
      ) : (
        <p>Your wishlist is empty.</p>

      )
      }
    </div>
  )
}

export default WishList