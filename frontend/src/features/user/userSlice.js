import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import Cookies from "js-cookie";

const user = Cookies.get("user_access_token");

const initialState = {
  user: user ? user : null,
  isErrorUser: false,
  isSuccessUser: false,
  isLoadingUser: false,
  messageUser: "",
};

export const login_user = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.loginUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const change_password_auth = createAsyncThunk(
  "user/password-changed",
  async (newPass, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user;
      return await userService.change_pass_loggedin(newPass, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkToken = createAsyncThunk(
  "user/getToken",
  async (token, thunkAPI) => {
    try {
      return await userService.checkToken(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout_user = createAsyncThunk("user/logout", async (token) => {
  await userService.logoutUser(token);
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoadingUser = false;
      state.isSuccessUser = false;
      state.isErrorUser = false;
      state.messageUser = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login_user.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(login_user.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
        state.user = action.payload;
      })
      .addCase(login_user.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.isErrorUser = true;
        state.messageUser = action.payload;
        state.user = null;
      })
      .addCase(logout_user.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(change_password_auth.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(change_password_auth.fulfilled, (state) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
      })
      .addCase(change_password_auth.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.isErrorUser = true;
        state.messageUser = action.payload;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.isErrorUser = true;
        state.messageUser = action.payload;
      }),
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
