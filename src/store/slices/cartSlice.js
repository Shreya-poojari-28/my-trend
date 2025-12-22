import { createSlice } from "@reduxjs/toolkit"

const findIndex = (state, action) => state.findIndex((cartItem) => cartItem.productId === action.payload.productId)

const slice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existingItemIndex = findIndex(state, action)
            if (existingItemIndex >= 0) {
                state[existingItemIndex].quantity += 1
            } else {
                state.push({ ...action.payload, quantity: 1 })
            }
        },
        removeCartItem: (state, action) => {
            const existingItemIndex = findIndex(state, action)
            if (existingItemIndex >= 0) state.splice(existingItemIndex, 1)
        },
        increaseItemQuantity: (state, action) => {
            const existingItemIndex = findIndex(state, action)
            if (existingItemIndex >= 0) state[existingItemIndex].quantity += 1
        },
        decreaseItemQuantity: (state, action) => {
            const existingItemIndex = findIndex(state, action)
            if (existingItemIndex >= 0) state[existingItemIndex].quantity -= 1
            else if (state[existingItemIndex].quantity === 0) state.splice(existingItemIndex, 1)
        }
    }
})

console.log('SLice', slice?.caseReducers);


export const {
    addToCart,
    removeCartItem,
    increaseItemQuantity,
    decreaseItemQuantity
} = slice.actions

export default slice.reducer