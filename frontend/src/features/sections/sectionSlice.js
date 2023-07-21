import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sectionService from "./sectionService";

const sectionLocal = localStorage.getItem("sections");
const section = JSON.parse(sectionLocal);

const initialState = {
  sections: section ? section : [],
  sectionLoading: false,
  sectionSuccess: false,
  sectionFailed: false,
  sectionMessage: "",
};

export const getSection = createAsyncThunk(
  "section/getSection",
  async (_, thunkAPI) => {
    try {
      return await sectionService.getSection();
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

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSection.pending, (state) => {
        state.sectionLoading = true;
      })
      .addCase(getSection.fulfilled, (state, action) => {
        state.sectionLoading = false;
        state.sectionSuccess = true;
        state.sections = action.payload;
      })
      .addCase(getSection.rejected, (state, action) => {
        state.sectionLoading = false;
        state.sectionFailed = true;
        state.sectionMessage = action.payload;
      });
  },
});

export const { reset } = sectionSlice.actions;
export default sectionSlice.reducer;
