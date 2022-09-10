import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openDrawer: true,
    errorAuthencationToken: null,
};

export const globalReduxSlice = createSlice({
    name: "globalReduxSlice",
    initialState,
    reducers: {
        changeOpenDrawer: (state, action) => {
            state.openDrawer = action.payload;
        },
        changeErrorAuthencationToken: (state, action) => {
            state.errorAuthencationToken = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeOpenDrawer, changeErrorAuthencationToken } = globalReduxSlice.actions;

export default globalReduxSlice.reducer;
