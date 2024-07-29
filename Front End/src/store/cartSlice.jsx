import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
        }
}})

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;  
