
export const ruppeeFormatter = (price, inrRate) => {
    return (inrRate ? inrRate * price : price * 82)
        .toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export const generateDiscount = () =>
    Math.floor(Math.random() * 40) + 10; // 10–50%

