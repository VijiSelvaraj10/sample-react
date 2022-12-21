import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    histories: []
}

export const medicalHistoryReducer = createSlice({
    name: "medicalHistoryReducer",
    initialState,
    reducers: {
        fetchHistories: (state, { payload }) => {
            state.histories = payload
        }
    }
}) 
export const { fetchHistories } = medicalHistoryReducer.actions;

export default medicalHistoryReducer.reducer;