import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openDrawer: true,
};

export const globalReduxSlice = createSlice({
    name: "globalReduxSlice",
    initialState,
    reducers: {
        changeOpenDrawer: (state, action) => {
            state.openDrawer = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeOpenDrawer } = globalReduxSlice.actions;

export default globalReduxSlice.reducer;
