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
      <div className="container py-5">
        {wishlistItems.length > 0 && (
          <h2 className="text-center mb-4 fw-bold display-6">
            My Wishlist
          </h2>
        )}

        {wishlistItems.length > 0 ? (
          <div className="row g-4 justify-content-center">
            {wishlistItems.map((item) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={item.productId}>
                <WishItem {...item} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyWishes />
        )}
      </div>
    </div>
  )
}

export default WishList