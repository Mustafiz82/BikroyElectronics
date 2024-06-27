import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import { baseApi } from './api/baseApi'
import filterSlice from './features/filter/filterSlice'

export const store = configureStore({
    reducer: {
        // tasksSlice: tasksSlice,
        [baseApi.reducerPath]: baseApi.reducer,
        userSlice: userSlice,
        filterSearch : filterSlice
      },
    
    
    middleware: (getDefaultMiddleware) =>    getDefaultMiddleware().concat(baseApi.middleware),
})