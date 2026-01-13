import React, { useContext, useState } from 'react'
import { ThemeProvider } from '../../../Contexts/ThemeProvider/ThemeProvider'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import { addToWishList, removeWishListItem } from '../../../store/slices/wishListSlice';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const Product = ({
    productId,
    image,
    price,
    rating,
    title,
    discountPercent,
    inrRate
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { theme } = useContext(ThemeProvider);

    const wishlist = useSelector((state) => state.wishList);
    const isWishlisted = wishlist.some(item => item.productId === productId);

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        const el = document.getElementById(`heart-${productId}`);

        if (isWishlisted) {
            dispatch(removeWishListItem({ productId }));
        } else {
            // Trigger pop animation
            el.classList.remove("heart-pop"); // reset animation if repeated quickly
            void el.offsetWidth; // force reflow
            el.classList.add("heart-pop");

            setTimeout(() => {
                dispatch(addToWishList({ productId, image, price, rating, title, discountPercent }));
            }, 200); // slightly shorter delay for smoother effect
        }
    }

    const handleCartToggle = (e) => {
        e.stopPropagation();
        dispatch(addToCart({ productId, image, price, rating, title, discountPercent }));
    };

    const discountedPrice = inrRate ? inrRate * price : price * 82;

    const originalPrice = Math.round(
        discountedPrice / (1 - discountPercent / 100)
    );

    const formattedOriginalPrice = originalPrice.toLocaleString('en-IN');
    const formattedDiscountedPrice = discountedPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 });

    // rating stars
    const renderStars = (rate) => {
        const total = 5;
        const full = Math.floor(rate);
        const half = rate % 1 >= 0.5;
        const empty = total - full - (half ? 1 : 0);

        return (
            <>
                {[...Array(full)].map((_, i) => <i key={i} className="fa-solid fa-star text-warning" />)}
                {half && <i className="fa-solid fa-star-half-stroke text-warning" />}
                {[...Array(empty)].map((_, i) => <i key={i} className="fa-regular fa-star text-warning" />)}
            </>
        );
    };

    return (
        <div
            className="col-lg-3 col-md-4 col-sm-6"
            onClick={() => navigate(`/product/${productId}`, { state: { discountPercent, inrRate } })}
        >
            <div
                className={`card h-100 border-0 shadow-sm rounded-4 overflow-hidden ${theme === "dark" ? "bg-dark text-light" : "bg-white"}`}
                role="button"
            >

                {/* Image */}
                <div className="p-3 d-flex justify-content-center align-items-center">
                    <img
                        src={image}
                        alt={title}
                        className="img-fluid"
                        style={{ height: "180px", objectFit: "contain" }}
                    />
                </div>

                {/* Discount Badge */}
                <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                    -{discountPercent}%
                </span>

                {/* Wishlist top-right */}
                <button
                    className="btn btn-light rounded-circle shadow position-absolute top-0 start-0 m-2"
                    onClick={handleWishlistToggle}
                >
                    {isWishlisted
                        ? <i id={`heart-${productId}`} className="fa-solid fa-heart text-danger"></i>
                        : <i id={`heart-${productId}`} className="fa-regular fa-heart"></i>}
                </button>

                {/* Card Body */}
                <div className="card-body">

                    <h6 className="fw-semibold text-truncate">{title}</h6>

                    {/* Rating */}
                    <div className="d-flex align-items-center small mb-2">
                        <span className="me-2">{renderStars(rating.rate)}</span>
                        <span className="text-muted">({rating.count})</span>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                        <span className="fw-bold fs-5 text-success">
                            ₹ {formattedDiscountedPrice}
                        </span>
                        <span className="text-muted text-decoration-line-through ms-2">
                            ₹ {formattedOriginalPrice}
                        </span>
                    </div>

                </div>

                {/* Footer Buttons */}
                <div className="card-footer bg-transparent border-0 d-flex gap-2 justify-content-between">

                    <button
                        className={`btn btn-outline-${theme === "dark" ? "light" : "dark"} w-100 rounded-pill`}
                        onClick={handleCartToggle}
                    >
                        <i className="fa-solid fa-cart-plus me-2"></i>
                        Add to Cart
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Product;
