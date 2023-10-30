import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAppSelector } from '../hooks/redux';
import { ISub } from '../models/ISub';
// import GetTocken from './getToken';



export const subAPI = createApi({
    reducerPath: 'subAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BD_HOST  + '/services/subscription_type'}),
    tagTypes: ['Sub'],
    endpoints: (build) => ({
        getAllSub: build.query<ISub[], {}>({
            query: () => ({
                // headers: {'Authorization': 'Bearer ' + token},
                url: '/get_all',
                // method: 'GET',
            }),
            // invalidatesTags: ['User']
        }),
        getSubById: build.query({
            query: (id) => ({
                url: '/get_by_id/' + id,
            }),
            // invalidatesTags: ['User']
        }),
    }),
    
    
})



