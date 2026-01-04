import React, { useContext, useEffect, useState } from 'react'
import Product from './Product/Product'
import { ThemeProvider } from '../../ThemeProvider/ThemeProvider';
import './Home.css'
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
  const themeData = useContext(ThemeProvider)
  const theme = themeData.theme;
  const products = useSelector((state) => state?.product || [])
  console.log('Products', products);
  const [inrRate, setInrRate] = useState(null);

  const convertDollarToRupee = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      const data = response.data

      const inrRate = data.rates.INR
      setInrRate(inrRate)
      return inrRate

    } catch (error) {
      console.error('Currency conversion failed', error)
      return null
    }
  }

  useEffect(() => {
    convertDollarToRupee();
  }, []);

  return (
    <div className={`home py-5 ${theme}`}>
      <div className="home-container d-flex flex-wrap justify-content-center">
        {products.length === 0 ? <h2>No Products Found</h2> : (
          products.map(({ id, image, price, rating, title }) => (
            <Product
              key={id}
              productId={id}
              image={image}
              price={price}
              rating={rating}
              title={title}
              inrRate={inrRate}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Home