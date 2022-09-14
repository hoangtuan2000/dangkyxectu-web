import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        fullName: null,
        code: null,
        phone: null,
        role: null,
        token: null,
        accessToken: null,
    },
};

export const currentUserSlice = createSlice({
    name: "currentUserSlice",
    initialState,
    reducers: {
        changeRoleUser: (state, action) => {
            state.user = {
                ...state.user,
                role: action.payload,
            };
        },
        changeFullNameUser: (state, action) => {
            state.user = {
                ...state.user,
                fullName: action.payload,
            };
        },
        changeCodeUser: (state, action) => {
            state.user = {
                ...state.user,
                code: action.payload,
            };
        },
        changePhoneUser: (state, action) => {
            state.user = {
                ...state.user,
                phone: action.payload,
            };
        },
        changeTokenUser: (state, action) => {
            state.user = {
                ...state.user,
                token: action.payload,
            };
        },
        changeAccessTokenUser: (state, action) => {
            state.user = {
                ...state.user,
                accessToken: action.payload,
            };
        },
        changeUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            };
        },
        deleteCurrentUser: (state, action) => {
            state.user = {
                fullName: null,
                code: null,
                role: null,
                token: null,
                accessToken: null,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    changeRoleUser,
    changeFullNameUser,
    changeCodeUser,
    changePhoneUser,
    deleteCurrentUser,
    changeTokenUser,
    changeAccessTokenUser,
    changeUser
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
