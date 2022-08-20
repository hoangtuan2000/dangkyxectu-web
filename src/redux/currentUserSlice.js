import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "abc",
        role: "admin"
    },
};

export const currentUserSlice = createSlice({
    name: "currentUserSlice",
    initialState,
    reducers: {
        changeCurrentUser: (state, action) => {
            state.user = {
                ...state.user,
                role: action.payload
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
