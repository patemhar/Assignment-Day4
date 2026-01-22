import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { productInt } from "../constants/products"

export type cartItems = {
    id: number
    images?: string[],
    title: string,
    description: string,
    price: number
    stock: number
    category: string,
    quantity: number
}

type CartState = {
    cartItems: cartItems[],
    customData: any[]
}

const initialState: CartState = {
    cartItems: [],
    customData: []
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<productInt>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({...newItem, quantity: 1});
      }
    },

    removeProduct: (state, action: PayloadAction<number>) => {
        const item = state.cartItems.find(item => item.id === action.payload);
        if(item && item.quantity > 1) {
            item.quantity -= 1;
        } else {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;