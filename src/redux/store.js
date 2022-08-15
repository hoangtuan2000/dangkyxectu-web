import { configureStore } from "@reduxjs/toolkit";
import themeDarkModeReducer from "./themeDarkModeSlice";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const darkModePersistConfig = {
    key: "themeDarkMode",
    version: 1,
    storage,
};

const darkModePersistedReducer = persistReducer(
    darkModePersistConfig,
    themeDarkModeReducer
);

export const store = configureStore({
    reducer: {
        themeDarkMode: darkModePersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
