import React, { useContext, useEffect, useMemo, useState } from 'react'
import Product from './Product/Product'
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider';
import './Home.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CurrencyContext } from '../../Contexts/CurrencyProvider/CurrencyProvider';
import { generateDiscount } from '../../Helper';

const Home = () => {
  const themeData = useContext(ThemeProvider)
  const theme = themeData.theme;
  const products = useSelector((state) => state?.product || [])
  // console.log('Products', products);

  const { inrRate } = useContext(CurrencyContext);

  const productsWithDiscount = useMemo(() => {
    return products.map(product => ({
      ...product,
      discountPercent: product.discountPercent ?? generateDiscount()
    }));
  }, [products]);

  return (
    <div className={`home py-5 ${theme}`}>
      <div className="home-container d-flex flex-wrap justify-content-center">
        {productsWithDiscount.length === 0 ? <h2>No Products Found</h2> : (
          productsWithDiscount.map(({ id, image, price, rating, title, discountPercent }) => (
            <Product
              key={id}
              productId={id}
              image={image}
              price={price}
              rating={rating}
              title={title}
              discountPercent={discountPercent}
              inrRate={inrRate}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Home