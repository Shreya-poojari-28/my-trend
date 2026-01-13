import React from "react";
import "./ProductDetailSkeleton.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="container py-4 skeleton-container">

      <div className="row g-4">

        {/* LEFT IMAGE SKELETON */}
        <div className="col-lg-5">
          <div className="skeleton skeleton-image"></div>

          <div className="d-flex gap-2 mt-3 justify-content-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton skeleton-thumb" />
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS SKELETON */}
        <div className="col-lg-7">

          <div className="skeleton skeleton-badge"></div>

          <div className="skeleton skeleton-title"></div>

          <div className="skeleton skeleton-rating"></div>

          <div className="skeleton skeleton-price-box"></div>

          <div className="skeleton skeleton-buttons"></div>

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton skeleton-text" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
