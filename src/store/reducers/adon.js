import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adons: [],
}

const AdonReducer = createSlice({
    name: "AdonReducer",
    initialState,
    reducers: {
        fetchAdons: ((state, { payload }) => {
            state.adons = payload;
        }),
        addAdons: ((state, {payload}) => {
            state.adons.push(payload);
        })
    }
})
export const { fetchAdons, addAdons } = AdonReducer.actions;

export default AdonReducer.reducer;