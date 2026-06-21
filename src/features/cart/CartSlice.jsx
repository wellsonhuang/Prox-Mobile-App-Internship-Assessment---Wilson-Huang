import { createSlice } from '@reduxjs/toolkit';

// 從 LocalStorage 嘗試載入歷史購物車資料
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('prox_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    return [];
  }
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(), // 初始化時讀取 LocalStorage
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, description } = action.payload; 
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, description, quantity: 1 });
      }
      // 每次新增後同步到 LocalStorage
      localStorage.setItem('prox_cart', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      localStorage.setItem('prox_cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; 
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; 
      }
      localStorage.setItem('prox_cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      // 結帳後清空購物車專用
      state.items = [];
      localStorage.setItem('prox_cart', JSON.stringify([]));
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;