import React, { useContext } from 'react'
import Product from './Product/Product'
import { ThemeProvider } from '../../ThemeProvider/ThemeProvider';
import './Home.css'

const Home = () => {
  const themeData = useContext(ThemeProvider)
  const theme = themeData.theme;
  return (
    <div className={`home py-5 ${theme}`}>
      <div className="home-container">
        <Product/>
      </div>
    </div>
  )
}

export default Home