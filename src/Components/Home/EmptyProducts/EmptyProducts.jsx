import React, { useContext } from 'react';
import './EmptyProducts.css';
import { ThemeProvider } from '../../../Contexts/ThemeProvider/ThemeProvider';

const EmptyProducts = () => {
    const { theme } = useContext(ThemeProvider); // 'light' or 'dark'

    return (
        <div className={`empty-products-container ${theme}`}>
            <div className="empty-icon">
                <i className="fa-solid fa-box-open"></i>
            </div>
            <h3>Oops! No Products Found</h3>
            <p>We couldn't find any products that match your search.</p>
            <button className="browse-btn">Browse All Products</button>
        </div>
    );
};

export default EmptyProducts;
