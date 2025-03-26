import { createSlice } from "@reduxjs/toolkit";

// Load auth state from localStorage
const storedAuth = localStorage.getItem("auth");
const initialState = storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("auth", JSON.stringify(state)); // ✅ Save to localStorage on login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("auth"); // ✅ Remove from localStorage on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
