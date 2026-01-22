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
    quantity: number,
    customizations?: string
}

export type customizationData = {
  id: number,
  data: string
}

type CartState = {
    cartItems: cartItems[],
}

const initialState: CartState = {
    cartItems: [],
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

    addCustomdata: (state, action: PayloadAction<customizationData>) => {
      const existstingItem = state.cartItems.find(item => item.id === action.payload.id)
      if(existstingItem) {
        existstingItem.customizations = action.payload.data;
      }
    },

    removeCustomdata: (state, action: PayloadAction<number>) => {
      const existstingItem = state.cartItems.find(item => item.id === action.payload)
      if(existstingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
    }

  },
});

export const { addProduct, removeProduct, clearCart, addCustomdata, removeCustomdata } = cartSlice.actions;
export default cartSlice.reducer;