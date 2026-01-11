import React from 'react'
import { useSelector } from 'react-redux'
import WishItem from './WishItem';
import './WishList.css'
import EmptyWishes from './EmptyWishes';

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishList)
  // console.log('wishlistItems:', wishlistItems);

  return (
    <div className='d-flex align-items-center justify-content-center gap-3 flex-wrap py-5 wishList-container'>
      {wishlistItems.length > 0 && <h2 className='w-100 text-center mb-4'>My Wish List</h2>}
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <WishItem key={item.productId} {...item} />
        ))
      ) : (
        <EmptyWishes/>
      )
      }
    </div>
  )
}

export default WishList