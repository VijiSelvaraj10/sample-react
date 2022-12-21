import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: []
}

export const categoryReducer = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {
        fetchCategory: (state, { payload }) => {
            state.categories = payload;
        }
    }
})
export const { fetchCategory } = categoryReducer.actions;

export default categoryReducer.reducer;