import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {},
    orders:[]
};

export const orderReducer = createSlice({
    name: "orderReducer",
    initialState,
    reducers: {
        fetchOrderById: (state, { payload }) => {
            state.order = payload;
        },
        fetchOrders:(state, { payload }) => {
            state.orders = payload;
    },
}
})

export const { fetchOrderById, createOrder, fetchOrders } = orderReducer.actions;
export default orderReducer.reducer;