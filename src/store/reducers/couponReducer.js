import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coupons: [],
    userSelectCoupon:null
}

export const couponReducer = createSlice({
    name: "couponReducer",
    initialState,
    reducers: {
        fetchCoupons: (state, { payload }) => {
            state.coupons = payload;
        },
        userApplyCoupon: (state, { payload }) => {
            state.userSelectCoupon = payload;
        }
    }
})
export const { fetchCoupons,userApplyCoupon } = couponReducer.actions;

export default couponReducer.reducer