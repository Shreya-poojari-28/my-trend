import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSLice";
import cartSlice from "./slices/cartSlice"
import wishListSlice from "./slices/wishListSlice"

export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
        wishList: wishListSlice
    },
})