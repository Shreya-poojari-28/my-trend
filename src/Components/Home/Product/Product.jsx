import React from 'react'
import './Product.css'

const Product = () => {
    return (
        <div className="product p-2">
            <div className="product-container">
                <img src="https://cdn.pixabay.com/photo/2023/05/08/21/59/tshirt-7979852_1280.jpg" alt="t-shirt" />
                <div className="product-details px-2">
                    <p>Product name: </p>
                    <p>Rating: 4.5
                        <span className="rating-stars mx-2">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </span>
                    </p>
                    <p>Price: $200</p>
                </div>
            </div>
        </div>
    )
}

export default Product