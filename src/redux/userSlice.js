// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isAuthenticated: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
