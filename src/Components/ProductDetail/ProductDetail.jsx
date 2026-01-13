import React, { useContext } from "react";
import "./ProductDetail.css";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHighlights, renderStars } from "../../Helper";
import { ThemeProvider } from "../../Contexts/ThemeProvider/ThemeProvider";
import { addToCart } from "../../store/slices/cartSlice";

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const theme = useContext(ThemeProvider).theme;

    const inrRate = location.state?.inrRate || {};
    const discountPercent = location.state?.discountPercent || 0;

    const products = useSelector((state) => state?.product || []);
    const product = products.find((prod) => prod.id === parseInt(id));
    console.log(products);


    if (!product) return <h4 className="text-center mt-5">Product not found</h4>;

    const discountedPrice = inrRate ? inrRate * product?.price : product?.price * 82;
    const originalPrice = Math.round(discountedPrice / (1 - discountPercent / 100));

    const formattedOriginalPrice = originalPrice.toLocaleString("en-IN");
    const formattedDiscountedPrice = discountedPrice.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
    });

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product.id, image: product.image, price: product.price, rating: product.rating, title: product.title }));
    }

    return (
        <div className="container py-4">

            {/* Breadcrumbs */}
            {/* <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href="/products">Products</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product?.title}</li>
        </ol>
      </nav> */}

            <div className="row g-4">

                {/* LEFT IMAGE AREA */}
                <div className="col-lg-5">
                    <div className="border rounded p-3 text-center shadow-sm">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className="img-fluid"
                            style={{ maxHeight: "420px", objectFit: "contain" }}
                        />
                    </div>

                    {/* Thumbnail gallery (optional) */}
                    <div className="d-flex gap-2 mt-3 justify-content-center">
                        {[product?.image, product?.image, product?.image].map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="thumb"
                                className="border rounded"
                                style={{ width: "70px", height: "70px", objectFit: "contain" }}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT DETAILS AREA */}
                <div className="col-lg-7">
                    <div className="d-flex align-items-center gap-2 mb-2">
                        {product?.rating?.rate > 4 && (
                            <span className="badge bg-success">Best Seller</span>
                        )}
                        {discountPercent > 20 && (
                            <span className="badge bg-danger">Limited Time Offer</span>
                        )}
                    </div>

                    <h3 className="fw-semibold">{product?.title}</h3>

                    {/* Rating */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="rating fw-bold">{product?.rating?.rate}</span>
                        <span className="rating-starts">{renderStars(product?.rating?.rate)}</span>
                        <span className="text-muted">({product?.rating?.count} ratings)</span>
                    </div>

                    <hr />

                    {/* PRICE BOX */}
                    <div className="mb-3">
                        <h4 className="fw-bold text-success mb-0">₹ {formattedDiscountedPrice}</h4>
                        <small
                            className={`text-decoration-line-through ${theme === "dark" ? "" : "text-muted"
                                }`}
                        >
                            ₹ {formattedOriginalPrice}
                        </small>
                        <span className="text-success fw-bold ms-2">
                            {discountPercent}% OFF
                        </span>
                    </div>

                    <p className="text-muted small">Inclusive of all taxes</p>

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-3 my-3">
                        <button className="btn btn-warning px-4 fw-semibold" onClick={handleAddToCart}>Add to Cart</button>
                        <button className="btn btn-success px-4 fw-semibold">Buy Now</button>
                    </div>

                    <hr />

                    {/* HIGHLIGHTS */}
                    <h5>Product Highlights</h5>
                    <ul className={`list-group list-group-flush ${theme}`}>
                        {getHighlights(product?.category).map((point, i) => (
                            <li key={i} className="list-group-item">
                                ✅ {point}
                            </li>
                        ))}
                    </ul>

                    {/* DESCRIPTION */}
                    <div className="mt-3">
                        <h5>Description</h5>
                        <p>{product?.description}</p>
                    </div>

                    <hr />

                    {/* DELIVERY / RETURN INFO */}
                    <div className={`bg-light p-3 rounded delivery ${theme === 'dark' ? 'bg-dark' : ''}`}>
                        <p className="mb-1">
                            🚚 <strong>Free Delivery</strong> on orders above ₹499
                        </p>
                        <p className="mb-1">🔁 7-day return & exchange policy</p>
                        <p className="mb-0">✔ Cash on Delivery available</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
