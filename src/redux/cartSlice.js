import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.item.id === newItem.item.id
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].qty += newItem.qty;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cart = state.cart.filter((item) => item.item.id !== itemIdToRemove);
    },
  },
});

export default cartSlice.reducer;
export const { addtoCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;
