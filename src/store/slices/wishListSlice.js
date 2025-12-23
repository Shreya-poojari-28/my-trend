import { createSlice } from "@reduxjs/toolkit"

const findIndex = (state, action) => state.findIndex((wishListItem) => wishListItem.productId === action.payload.productId)

const slice = createSlice({
    name: "wishList",
    initialState: [],
    reducers: {
        addToWishList: (state, action) => {
            const existingItemIndex = findIndex(state, action)
            if (existingItemIndex < 0) {
                state.push({ ...action.payload })
            }
        },
        removeWishListItem: (state, action) => {
            const existingItemIndex = findIndex(state, action)
            if (existingItemIndex >= 0) state.splice(existingItemIndex, 1)
        }
    }
})

export const {
    addToWishList,
    removeWishListItem
} = slice.actions

export default slice.reducer