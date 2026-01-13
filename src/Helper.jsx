
export const ruppeeFormatter = (price, inrRate) => {
    return (inrRate ? inrRate * price : price * 82)
        .toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export const generateDiscount = () =>
    Math.floor(Math.random() * 40) + 10; // 10–50%

export const renderStars = (rate) => {
    const totalStars = 5;
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <>
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <i key={`full-${i}`} className="fa-solid fa-star"></i>
            ))}

            {/* Half star */}
            {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <i key={`empty-${i}`} className="fa-regular fa-star"></i>
            ))}
        </>
    );
};

export const getHighlights = (category) => {
    switch (category) {
        case "men's clothing":
        case "women's clothing":
            return [
                "Soft & breathable fabric",
                "Comfortable all-day wear",
                "Premium stitching quality",
                "Available in multiple sizes",
                "Ideal for daily & casual use",
            ];

        case "electronics":
            return [
                "High performance hardware",
                "Energy efficient design",
                "Reliable brand assurance",
                "Compatible with multiple devices",
                "Fast & secure data handling",
            ];

        case "jewelery":
            return [
                "Elegant premium finish",
                "Skin-friendly material",
                "Perfect for gifting",
                "Lightweight & comfortable",
                "Timeless design style",
            ];

        default:
            return [
                "High quality and durable product",
                "Verified seller listing",
                "Best value at current price",
                "Secure packaging",
                "Easy returns available",
            ];
    }
};
