import React, { useContext, useEffect, useMemo, useState } from 'react'
import Product from './Product/Product'
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider';
import { useSelector } from 'react-redux';
import { CurrencyContext } from '../../Contexts/CurrencyProvider/CurrencyProvider';
import { generateDiscount } from '../../Helper';
import './Home.css'
import Aos from 'aos';
import 'aos/dist/aos.css';
import EmptyProducts from './EmptyProducts/EmptyProducts';

const Home = () => {

  const { theme } = useContext(ThemeProvider);
  const products = useSelector((state) => state?.product || []);
  const { inrRate } = useContext(CurrencyContext);

  const [searchTerm, setSearchTerm] = useState("");

  const productsWithDiscount = useMemo(() => {
    return products.map(product => ({
      ...product,
      discountPercent: product.discountPercent ?? generateDiscount()
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return productsWithDiscount.filter(p =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productsWithDiscount, searchTerm]);

  useEffect(() => {
    Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <div className={`py-5 ${theme === "dark" ? "bg-dark text-light" : "bg-light"}`}>

      {/* HERO SECTION */}
      <div className="container text-center mb-4">

        <div className="p-4 rounded-4 shadow-sm bg-gradient bg-opacity-75 bg-body-tertiary hero-text">
          <h1 className="fw-bold mb-2">Discover Premium Products</h1>
          <p className="text-muted">Hand-picked items, best prices, fast delivery</p>
        </div>

        <div className="floating-elements">
          <span className="float-circle" style={{ top: '20%', left: '10%' }}></span>
          <span className="float-circle" style={{ top: '60%', right: '15%' }}></span>
        </div>

      </div>

      {/* SEARCH BAR */}
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">

            <div className="input-group shadow rounded-pill">
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className={`form-control border-0 bg-transparent shadow-none fw-semibold input-group search-bar ${theme}`}
                placeholder="Search for amazing products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  outline: "none",
                  boxShadow: "none",
                  fontWeight: 500,
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="container">
        <div className="row g-4">

          {filteredProducts.length === 0 && (
            <div className="text-center py-5">
              <EmptyProducts setSearchTerm={setSearchTerm}/>
            </div>
          )}

          <div className="row g-4">
            {filteredProducts.map(({ id, image, price, rating, title, discountPercent }) => (
              <div
                key={id}
                data-aos="fade-up"
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <Product
                  productId={id}
                  image={image}
                  price={price}
                  rating={rating}
                  title={title}
                  discountPercent={discountPercent}
                  inrRate={inrRate}
                />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home
