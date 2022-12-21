import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {}, carts: [],
  isHomeButton: false,
};

export const productManagementReducer = createSlice({
  name: "productManagementReducer",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      state.carts.push(payload)
    },
    reloadCart: (state, { payload }) => {
      state.carts = payload
    },
    updateCart: (state, { payload }) => {
      state.carts = [...payload]
    },
    fetchProduct: (state, { payload }) => {
      state.products = payload;
    },
    fetchProductId: (state, { payload }) => {
      state.product = payload;
    },
    addProduct: (state, { payload }) => {
      state.products.push(payload);
    },
    updateProduct: (state, { payload }) => {
      state.products = state.products.map((item) => item.id === payload.id ? payload : item)
    },
    addProductAdon: (state, { payload }) => {
      let updatedProduct = state.products.find(item => item.id === payload.product_id);
      if (updatedProduct !== null) {
        updateProduct.hasOwnProperty('relatedProduct') && updateProduct.relatedProduct.push(payload);
      }
      state.products = state.products.map((item) => item.id === payload.product_id ? updatedProduct : item)
    },
    isHomeButton: (state, { payload }) => {
      state.isHomeButton = payload;
    }
  }
});


// Action creators are generated for each case reducer function
export const { fetchProduct, addProduct, updateProduct, addProductAdon, fetchProductId, addCart, isHomeButton, updateCart, reloadCart } = productManagementReducer.actions
export default productManagementReducer.reducer;
