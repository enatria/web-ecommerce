import { createSlice } from '@reduxjs/toolkit';
import { removeTokens } from '../config/tokenCreator';
const initialState = {
  user: {},
  isLogin : false,
  isLoading: false,
  error:"",
}


const authenticationSlice = createSlice({
    name:"authentication",
    initialState,
    reducers: {
          pending: (state) => {
            state.isLoading = true;
          },
          success: (state, action) => {
            state.user = action.payload;
            state.isLoading = true;
            state.error = "";
          },
          error: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
      },
          logout: () => {
            removeTokens()
          }
        }
})



  export const { pending, success, error, logout } = authenticationSlice.actions;
  export const authenticationReducer = authenticationSlice.reducer;