// src/app/store.js (或 src/store/store.js)
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/CartSlice'; 

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;