import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UserAuthState {
    isAuth: boolean;
    token: string;
    nPage: string;
    sub_id: string;
    trainer_id: string;
}

const initialState: UserAuthState = {
    token: "",
    isAuth: false,
    nPage: "login",
    sub_id: "",
    trainer_id: "",
}


export const userAuthSlice = createSlice({
    name: 'user_auth',
    initialState,
    reducers: {
        auth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload; 
        },
        setNPage(state, action: PayloadAction<string>) {
            state.nPage = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setSub(state, action: PayloadAction<string>) {
            state.sub_id = action.payload;
        },
        setTrainer(state, action: PayloadAction<string>) {
            state.trainer_id = action.payload;
        }
    }
})

export default userAuthSlice.reducer;