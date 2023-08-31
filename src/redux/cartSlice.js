import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export default cartSlicer.reducer;
export const { addtoCart } = cartSlicer.actions;
