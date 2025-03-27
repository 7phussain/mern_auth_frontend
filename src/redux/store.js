"use client";
// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./leadSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    user: userReducer,
  },
});
