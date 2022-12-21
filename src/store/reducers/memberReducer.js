import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
  member: {}
};

export const memberReducer = createSlice({
  name: "memberReducer",
  initialState,
  reducers: {
    fetchMember: (state, { payload }) => {
      state.members = payload;
    },

    addMember: (state, { payload }) => {
      //  console.log("**CreateMemberAction********payload******"+JSON.stringify(payload));
      state.members.push(payload);
    },

    updateMember: (state, { payload }) => {
      state.members = state.members.map((item) => item.id === payload.id ? payload : item)
    },

    fetchMemberById: (state, { payload }) => {
      state.member = payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { fetchMember, addMember, updateMember, fetchMemberById } = memberReducer.actions
export default memberReducer.reducer;
