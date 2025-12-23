import React, { useContext } from 'react'
import Product from './Product/Product'
import { ThemeProvider } from '../../ThemeProvider/ThemeProvider';
import './Home.css'
import { useSelector } from 'react-redux';

const Home = () => {
  const themeData = useContext(ThemeProvider)
  const theme = themeData.theme;
  const products = useSelector((state) => state?.product || [])
  console.log('Products', products);

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
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Home