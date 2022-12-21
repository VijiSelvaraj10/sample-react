import {createSlice} from '@reduxjs/toolkit';

const initialState={
    accounts:[]
}

export const AccountReducer = createSlice({
    name:"AccountReducer",
    initialState,
    reducer:{
        createAccount:(state, {payload})=>{
            state.accounts.push(payload)
        }
    }
})

export const {createAccount} = AccountReducer.actions;

export default AccountReducer.reducer;