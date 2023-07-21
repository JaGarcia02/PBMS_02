import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";

const admin = Cookies.get("admin_access_token");

const initialState = {
  admin: admin ? admin : null,
  isErrorAdmin: false,
  isSuccessAdmin: false,
  isLoadingAdmin: false,
  messageAdmin: "",
};

//LOGIN CALL FROM THE BACKEND
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginAdmin(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//CHECKER OF TOKEN IN EVERY 2 SECS
export const checkToken = createAsyncThunk(
  "auth/getMe",
  async (token, thunkAPI) => {
    try {
      return await authService.checkToken(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.removeItem("user");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutAdmin = createAsyncThunk("auth/logout", async () => {
  await authService.logoutAdmin();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoadingAdmin = false;
      state.isSuccessAdmin = false;
      state.isErrorAdmin = false;
      state.messageAdmin = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoadingAdmin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingAdmin = false;
        state.isSuccessAdmin = true;
        state.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingAdmin = false;
        state.isErrorAdmin = true;
        state.messageAdmin = action.payload;
        state.admin = null;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.isLoadingAdmin = false;
        state.isErrorAdmin = true;
        state.messageAdmin = action.payload;
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.admin = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
