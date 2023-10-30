import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAppSelector } from '../hooks/redux';
// import GetTocken from './getToken';



export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BD_HOST  + '/users'}),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getMeUser: build.query({
            query: (token: string) => ({
                headers: {'Authorization': 'Bearer ' + token},
                url: '/me',
                // method: 'GET',
            }),
            // invalidatesTags: ['User']
        }),
        patchMeUser: build.mutation({
            query: ([user_patch, token]) => ({
                headers: {'Authorization': 'Bearer ' + token},
                url: '/me',
                method: 'PATCH',
                body: user_patch
            }),
            // invalidatesTags: ['User']
        }),
    })
})


