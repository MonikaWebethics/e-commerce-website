import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cart = state.cart.filter((item) => item.item.id !== itemIdToRemove);
    },
  },
});

export default cartSlice.reducer;
export const { addtoCart, removeFromCart } = cartSlice.actions;
