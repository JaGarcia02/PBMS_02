import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  listUsers: [],
  isErrorList: false,
  isSuccessList: false,
  isLoadingList: false,
  messageList: "",
};

export const getAllUsers = createAsyncThunk(
  "list/getAllUsers",
  async (searchValue, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.getAllUsers(searchValue, token);
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

export const create_user = createAsyncThunk(
  "list/createUser",
  async (objectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.create_user(token, objectData);
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

export const resetUser = createAsyncThunk(
  "list/reset_user",
  async (ID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.reset_user(ID, token);
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

export const unsuspend = createAsyncThunk(
  "list/unsuspend_user",
  async (ID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.unsuspend_user(ID, token);
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

export const suspend = createAsyncThunk(
  "list/suspend_user",
  async (ID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.suspend_user(ID, token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reactivate = createAsyncThunk(
  "list/reactivate_user",
  async (ID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.reactivate_user(ID, token);
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

export const deactivate = createAsyncThunk(
  "list/deactivate_user",
  async (ID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.deactivate_user(ID, token);
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

export const editUser = createAsyncThunk(
  "list/editUser",
  async (object, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin
        ? thunkAPI.getState().auth.admin
        : thunkAPI.getState().user.user;
      return await usersService.edit_user(object, token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
        state.listUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      })
      .addCase(resetUser.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(resetUser.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
        state.listUsers = action.payload;
      })
      .addCase(resetUser.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      })
      .addCase(unsuspend.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(unsuspend.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
        state.listUsers = action.payload;
      })
      .addCase(unsuspend.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      })
      .addCase(suspend.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(suspend.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
        state.listUsers = action.payload;
      })
      .addCase(suspend.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      })
      .addCase(reactivate.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(reactivate.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
        state.listUsers = action.payload;
      })
      .addCase(reactivate.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      })
      .addCase(deactivate.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(deactivate.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
        state.listUsers = action.payload;
      })
      .addCase(deactivate.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
        state.listUsers = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      })
      .addCase(create_user.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(create_user.fulfilled, (state) => {
        state.isLoadingList = false;
        state.isSuccessList = true;
      })
      .addCase(create_user.rejected, (state, action) => {
        state.isLoadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
      }),
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
