import { configureStore } from "@reduxjs/toolkit";
import todoreducer from '../features/TodoSlice';
import authreducer from '../features/AuthSlice'

export const store = configureStore({
    reducer: {
        todo: todoreducer,
        auth: authreducer
    }
})