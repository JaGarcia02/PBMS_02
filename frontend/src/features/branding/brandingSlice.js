import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandingService from "./brandingService";

const initialState = {
  branding: null,
  timeFormat: null,
  isBrandingError: false,
  isBrandingSuccess: false,
  isBrandingLoading: false,
  brandingMessage: "",
};

export const getBrand = createAsyncThunk("brand/image", async (_, thunkAPI) => {
  try {
    return await brandingService.getBranding();
  } catch (err) {
    const errMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(errMessage);
  }
});

export const getSettings = createAsyncThunk(
  "brand/settings",
  async (_, thunkAPI) => {
    try {
      return await brandingService.getSettings();
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

export const brandingSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrand.pending, (state) => {
        state.isBrandingLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isBrandingLoading = false;
        state.isBrandingSuccess = true;
        state.branding = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isBrandingLoading = false;
        state.isBrandingError = true;
        state.brandingMessage = action.payload;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.timeFormat = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.timeFormat = [{ DateTimeFormat: "MMMM, DD YYYY hh:mm a" }];
      });
  },
});

export const { reset } = brandingSlice.actions;
export default brandingSlice.reducer;
