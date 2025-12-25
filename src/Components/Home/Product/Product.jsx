import React, { useContext } from 'react'
import './Product.css'
import { ThemeProvider } from '../../../ThemeProvider/ThemeProvider'

const Product = ({
    productId,
    image,
    price,
    rating,
    title
}) => {

    const themeData = useContext(ThemeProvider)
    const theme = themeData.theme;
    
    return (
        <div className="product p-2">
            <div className={`product-container p-2 ${theme}`}>
                <img src={image} alt="t-shirt" />
                <div className="product-details px-2">
                    <p>Product name</p>
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