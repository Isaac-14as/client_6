import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITrainer } from '../models/ITrainer';



export const trainerAPI = createApi({
    reducerPath: 'trainerAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BD_HOST + '/services/trainer'}),
    tagTypes: ['Trainer'],
    endpoints: (build) => ({
        getAllTrainer: build.query<ITrainer[], {}>({
            query: () => ({
                url: '/get_all',
            }),
        }),
    }),
})
