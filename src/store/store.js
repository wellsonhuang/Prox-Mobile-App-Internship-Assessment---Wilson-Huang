// src/app/store.js (或 src/store/store.js)
import { configureStore } from '@reduxjs/toolkit';
// 🌟 改用 ../ 回到上一層，就能正確指向 src/features/cart/CartSlice
import cartReducer from '../features/cart/CartSlice'; 

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;