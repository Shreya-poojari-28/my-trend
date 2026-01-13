import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from './EmptyCart'
import { CurrencyContext } from '../../Contexts/CurrencyProvider/CurrencyProvider'
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider'
import { ruppeeFormatter } from '../../Helper'
import './Cart.css'
import { decreaseItemQuantity, increaseItemQuantity, removeCartItem } from '../../store/slices/cartSlice'
import { toast } from 'react-toastify'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { inrRate } = useContext(CurrencyContext)
  const theme = useContext(ThemeProvider).theme

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseItemQuantity({ productId: item.productId, quantity: item.quantity }))
  }

  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      dispatch(removeCartItem({ productId: item.productId }))
    }
    dispatch(decreaseItemQuantity({ productId: item.productId, quantity: item.quantity }))
  }

  const handleRemoveItem = (item) => {
    dispatch(removeCartItem({ productId: item.productId }))
    toast.warn("Removed from cart!");
  }

  const grandTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  return (
    <div className={`cart-wrapper ${theme}`}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className={`table-responsive ${theme} px-5 py-4`}>
          <table className={`table table-striped align-middle cart-table ${theme}`}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th className="text-center">Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  {/* Product */}
                  <td className="product-cell">
                    <img src={item.image} alt={item.name} />
                    <span className="product-name">{item.name}</span>
                  </td>

                  {/* Price */}
                  <td data-label="Price">
                    ₹ {ruppeeFormatter(item.price, inrRate)}
                  </td>

                  {/* Quantity */}
                  <td className="text-center" data-label="Quantity">
                    <div className="qty-box">
                      <button className="qty-btn" onClick={() => handleDecreaseQuantity(item)}>−</button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => handleIncreaseQuantity(item)}>+</button>
                    </div>
                  </td>

                  {/* Total */}
                  <td data-label="Total" className="fw-bold">
                    ₹ {ruppeeFormatter(item.price * item.quantity, inrRate)}
                  </td>

                  {/* Remove */}
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger remove-btn" onClick={() => handleRemoveItem(item)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="grand-total-row">
                <td colSpan="3"></td>
                <td className="fw-bold">Grand Total:</td>
                <td className="fw-bold">
                  ₹ {ruppeeFormatter(grandTotal, inrRate)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Cart
