import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
        status: true
    },
    reducers: {
        addToCart(state, action){
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            console.log(existingItem);
            
            if (!existingItem) {
                 state.items.push(action.payload)
                 state.total ++
                 state.status = true
            } 
            else {
                state.status = false
            }
            console.log(state);
            

        },
        removeFromCart(state, action){
            state.items = state.items.filter(i => i.id !== action.payload)
            state.total -= 1
            console.log(state);
            
        }
}})

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;  
