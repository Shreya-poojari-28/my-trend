import React, { useContext, useState } from 'react'
import './Product.css'
import { ThemeProvider } from '../../../Contexts/ThemeProvider/ThemeProvider'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import { addToWishList, removeWishListItem } from '../../../store/slices/wishListSlice';

const Product = ({
    productId,
    image,
    price,
    rating,
    title,
    discountPercent,
    inrRate
}) => {
    console.log('discountPercent', discountPercent);
    
    const dispatch = useDispatch()

    const [cartAdded, setCartAdded] = useState(false);

    const themeData = useContext(ThemeProvider)
    const theme = themeData.theme;

    const wishlist = useSelector((state) => state.wishList);
    const isWishlisted = wishlist.some(
        item => item.productId === productId
    );

    const handleWishlistToggle = () => {
        if (isWishlisted) {
            dispatch(removeWishListItem({ productId }));
        } else {
            dispatch(addToWishList({ productId, image, price, rating, title, discountPercent }));
        }
    };

    const handleCartToggle = () => {
        // setCartAdded((prevState) => !prevState);
        dispatch(addToCart({ productId, image, price, rating, title, discountPercent }));
    }

    const ruppeeFormatter = (inrRate ? inrRate * price : price * 82)
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

    const discountedPrice = inrRate ? inrRate * price : price * 82;

    const originalPrice = Math.round(
        discountedPrice / (1 - discountPercent / 100)
    );

    const formattedOriginalPrice = originalPrice.toLocaleString('en-IN');
    const formattedDiscountedPrice = discountedPrice.toLocaleString('en-IN', {maximumFractionDigits: 0})

    return (
        <div className="product p-2">
            <div className={`product-container p-2 ${theme}`}>
                <img src={image} alt="t-shirt" />
                <div className="product-details px-2">
                    <p>{(title).slice(0, 20)}...</p>
                    <p>
                        {/* Rating: {rating.rate} */}
                        <span className="rating-stars">
                            {renderStars(rating.rate)}
                        </span>
                        <span className="rating-count mx-2">
                            ({rating.count})
                        </span>
                    </p>
                    <p className="price">
                        <span className="mx-2 fw-bold">
                            ₹ {formattedDiscountedPrice}
                        </span>
                        <small className={`original-price ${theme === 'dark' ? '' : 'text-muted'} text-decoration-line-through`}>
                            ₹ {formattedOriginalPrice}
                        </small>
                        &nbsp;
                        <small className="discount text-success fw-bold">
                            {discountPercent}% OFF
                        </small>
                    </p>
                </div>
                <div className="button-container text-center my-2">
                    <button className="cart-btn" onClick={handleCartToggle}>{cartAdded ? "Remove" : "Add"} item</button>
                    <button className="wishlist-btn" onClick={handleWishlistToggle}>
                        {isWishlisted
                            ? <i className="fa-solid fa-heart"></i>
                            : <i className="fa-regular fa-heart"></i>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product