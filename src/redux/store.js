import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './authenticationSlice';
import productReducer from './productSlice';

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        product : productReducer
    }
})