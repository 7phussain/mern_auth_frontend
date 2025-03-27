"use client";
// src/redux/leadsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leads: [],
  isLoading: false,
};

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLeads, setLoading } = leadsSlice.actions;

export default leadsSlice.reducer;
