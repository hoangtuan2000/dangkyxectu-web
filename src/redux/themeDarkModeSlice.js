import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
};

export const darkModeSlice = createSlice({
    name: "darkModeSlice",
    initialState,
    reducers: {
        changeDarkMode: (state, action) => {
            state.darkMode = !state.darkMode;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
