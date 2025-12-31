import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CardapioItem } from '../types';

type CartState = {
  items: CardapioItem[];
  isOpen: boolean;
};

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CardapioItem>) => {
      const itemExists = state.items.find((i) => i.id === action.payload.id);
      if (!itemExists) {
        state.items.push(action.payload);
      }
      state.isOpen = true;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clear: (state) => {
      state.items = [];
    }
  },
});

export const { add, remove, toggleCart, clear } = cartSlice.actions;
export default cartSlice.reducer;