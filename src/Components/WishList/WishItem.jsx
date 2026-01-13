import React, { useContext, useMemo, useState } from 'react'
import { CurrencyContext } from '../../Contexts/CurrencyProvider/CurrencyProvider';
import { addToCart } from '../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { removeWishListItem } from '../../store/slices/wishListSlice';
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider';
import { renderStars, ruppeeFormatter } from '../../Helper';
import { useNavigate } from 'react-router-dom';

const WishItem = ({ ...item }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { inrRate } = useContext(CurrencyContext);
    const theme = useContext(ThemeProvider).theme;

    const [cartAdded, setCartAdded] = useState(false);

    const handleCartToggle = () => {
        // setCartAdded((prevState) => !prevState);
        dispatch(addToCart({ productId: item.productId, image: item.image, price: item.price, rating: item.rating, title: item.title }));
    }

    const handleWishlistToggle = () => {
        dispatch(removeWishListItem({ productId: item.productId }));
    };

    const discountedPrice = inrRate ? inrRate * item.price : item.price * 82;

    const originalPrice = Math.round(
        discountedPrice / (1 - item?.discountPercent / 100)
    );

    const formattedOriginalPrice = originalPrice.toLocaleString('en-IN');
    const formattedDiscountedPrice = discountedPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })

    return (
        <div
            className='wishItem cursor-pointer'
            onClick={() => navigate(`/product/${item.productId}`, { state: { discountPercent: item.discountPercent, inrRate } })}
        >
            <div className={`wish-container card shadow-sm border-0 rounded-4 ${theme === "dark" ? "bg-dark text-light" : "bg-white"}`}>
                <div className="p-3 text-center">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                        style={{ height: "160px", objectFit: "contain" }}
                    />
                </div>

                <div className="card-body">
                    <h6 className="fw-semibold text-truncate">{item.title}</h6>

                    <div className="d-flex align-items-center mt-1">
                        <span className="me-2 rating-star">{renderStars(item.rating.rate)}</span>
                        <small className="text-muted">({item.rating.count})</small>
                    </div>

                    <div className="mt-2">
                        <span className="fw-bold fs-5">₹ {formattedDiscountedPrice}</span>
                        <small className="text-muted text-decoration-line-through ms-2">
                            ₹ {formattedOriginalPrice}
                        </small>
                        <span className="badge bg-success ms-2">
                            {item.discountPercent}% OFF
                        </span>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        <button
                            className={`btn btn-outline-${theme === "dark" ? "light" : "dark"} w-75 rounded-pill`}
                            onClick={(e) => {
                                handleCartToggle();
                                e.stopPropagation();
                            }}
                        >
                            <i className="fa-solid fa-cart-plus me-2"></i>
                            Add to Cart
                        </button>

                        <button
                            className="wish rounded-circle ms-2"
                            onClick={(e) => {
                                handleWishlistToggle();
                                e.stopPropagation();
                            }}
                        >
                            <i className="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishItem