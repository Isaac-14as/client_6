import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authAPI } from "../services/authService";
import { usersAPI } from "../services/usersService";
import userAuthReducer from "./reducers/UserAuthSlice"
import { subAPI } from "../services/subService";
import { trainerAPI } from "../services/trainerService";


const rootReducer = combineReducers({
    userAuthReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [subAPI.reducerPath]: subAPI.reducer,
    [trainerAPI.reducerPath]: trainerAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(authAPI.middleware, usersAPI.middleware, subAPI.middleware, trainerAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
