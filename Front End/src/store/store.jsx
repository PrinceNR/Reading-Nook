import {configureStore} from '@reduxjs/toolkit'
import bookSlice from './bookSlice'
import cartSlice from './cartSlice'


const store = configureStore({
    reducer: {
        books : bookSlice,
        cart : cartSlice,
    } 
})

export default store;