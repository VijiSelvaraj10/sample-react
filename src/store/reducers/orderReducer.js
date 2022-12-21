import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {}
};

export const orderReducer = createSlice({
    name: "orderReducer",
    initialState,
    reducers: {
        fetchOrderById: (state, { payload }) => {
            state.order = payload
        }
    }
})

export const { fetchOrderById } = orderReducer.actions;
export default orderReducer.reducer;