import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, IUserLogin} from '../models/IUser';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BD_HOST  + '/auth'}),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        createUser: build.mutation<JSON, IUser>({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user,
            }),
            // invalidatesTags: ['User']
        }),
        // loginUser: build.mutation<LoginResponse, IUserLogin>({
        loginUser: build.mutation({
            query: (user_login) => ({
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                // headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTIyMWZmYzktNjQwZi00MzcyLTg2ZDMtY2U2NDJjYmE1NjAzIiwiYXVkIjoiZmFzdGFwaS11c2VyczphdXRoIiwiZXhwIjoxNTcxNTA0MTkzfQ.M10bjOe45I5Ncu_uXvOmVV8QxnL-nZfcH96U90JaocI'},
                credentials: "include",
                url: `/login`,
                method: 'POST',
                body: user_login,
            }),
        }),
        logoutUser: build.mutation({
            query: () => ({
                credentials: "include",
                url: `/logout`,
                method: 'POST',
            }),
        }),
    })
})


