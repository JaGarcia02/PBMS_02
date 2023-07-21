import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authRoleService from "./authRoleService";

const authRole = localStorage.getItem("authorizationRole");
const roleAuth = JSON.parse(authRole);

const initialState = {
  authRole: roleAuth ? roleAuth : null,
  authRoleLoading: false,
  authRoleSuccess: false,
  authRoleFailed: false,
  authRoleMessage: "",
};

export const getAuthRole = createAsyncThunk(
  "role/auth",
  async (_, thunkAPI) => {
    try {
      return await authRoleService.get_authRole();
    } catch (error) {
      const errMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

const authRoleSlice = createSlice({
  name: "authRole",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthRole.pending, (state) => {
        state.authRoleLoading = true;
      })
      .addCase(getAuthRole.fulfilled, (state, action) => {
        state.authRoleLoading = false;
        state.authRoleSuccess = true;
        state.authRole = action.payload;
      })
      .addCase(getAuthRole.rejected, (state, action) => {
        state.authRoleLoading = false;
        state.authRoleFailed = true;
        state.authRoleMessage = action.payload;
      });
  },
});

export const { reset } = authRoleSlice;
export default authRoleSlice.reducer;
