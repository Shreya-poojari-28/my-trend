import React, { useContext } from 'react'
import { CurrencyContext } from '../../Contexts/CurrencyProvider/CurrencyProvider';

const WishItem = ({ ...item }) => {
    
    const { inrRate } = useContext(CurrencyContext);  
    
    const ruppeeFormatter = (inrRate ? inrRate * item.price : item.price * 82)
    .toLocaleString('en-IN', { maximumFractionDigits: 0 })
    
    console.log('ruppeeFormatter', ruppeeFormatter);

    const renderStars = (rate) => {
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

    return (
        <div className='wishItem'>
            <div className="wish-container p-4">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                    <p>{(item?.title).slice(0, 20)}...</p>
                    <p>
                        {/* Rating: {rating.rate} */}
                        <span className="rating-stars">
                            {renderStars(item?.rating.rate)}
                        </span>
                        <span className="rating-count mx-2">
                            ({item?.rating.count})
                        </span>
                    </p>
                    <p>Price: ₹ {ruppeeFormatter}</p>
                </div>
            </div>
        </div>
    )
}

export default WishItem