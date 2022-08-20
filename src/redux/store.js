import { configureStore } from "@reduxjs/toolkit";
import themeDarkModeReducer from "./themeDarkModeSlice";
import currentUserReducer from "./currentUserSlice";

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

const currentUserPersistConfig = {
    key: "currentUser",
    version: 1,
    storage,
};

const darkModePersistedReducer = persistReducer(
    currentUserPersistConfig,
    themeDarkModeReducer
);

const currentUserPersistedReducer = persistReducer(
    darkModePersistConfig,
    currentUserReducer
);

export const store = configureStore({
    reducer: {
        themeDarkMode: darkModePersistedReducer,
        currentUser: currentUserPersistedReducer,
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
