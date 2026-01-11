import React, { useContext, useState } from 'react'
import { CurrencyContext } from '../../Contexts/CurrencyProvider/CurrencyProvider';
import { addToCart } from '../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { removeWishListItem } from '../../store/slices/wishListSlice';
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider';

const WishItem = ({ ...item }) => {
    const dispatch = useDispatch()
    const { inrRate } = useContext(CurrencyContext);
    const theme = useContext(ThemeProvider).theme;    

    const [cartAdded, setCartAdded] = useState(false);


    const ruppeeFormatter = (inrRate ? inrRate * item.price : item.price * 82)
        .toLocaleString('en-IN', { maximumFractionDigits: 0 })

    const renderStars = (rate) => {
        const totalStars = 5;
        const fullStars = Math.floor(rate);
        const hasHalfStar = rate % 1 >= 0.5;
        const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {/* Full stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fa-solid fa-star"></i>
                ))}

                {/* Half star */}
                {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}

                {/* Empty stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="fa-regular fa-star"></i>
                ))}
            </>
        );
    };

    const handleCartToggle = () => {
        // setCartAdded((prevState) => !prevState);
        dispatch(addToCart({ productId: item.productId, image: item.image, price: item.price, rating: item.rating, title: item.title }));
    }

    const handleWishlistToggle = () => {
        dispatch(removeWishListItem({ productId: item.productId }));
    };

    return (
        <div className='wishItem'>
            <div className={`wish-container p-4 ${theme}`}>
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                    <p>{(item?.title).slice(0, 20)}...</p>
                    <p>
                        {/* Rating: {rating.rate} */}
                        <span className="rating-stars">
                            {renderStars(item?.rating.rate)}
                        </span>
                        <span className="rating-count mx-2">
                            ({item?.rating.count})
                        </span>
                    </p>
                    <p>Price: ₹ {ruppeeFormatter}</p>
                </div>
                <div className="button-container text-center my-2">
                    <button className="cart-btn" onClick={handleCartToggle}>{cartAdded ? "Remove" : "Add"} item</button>
                    <button className="wishlist-btn" onClick={handleWishlistToggle}>
                        <i className="fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WishItem