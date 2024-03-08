// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    navigationURL: "",
    navigationTitle: "",
    setState: "",
  },
  reducers: {
    navigation: (state, action) => {
      state.navigationURL = action.payload.navigationURL;
      state.navigationTitle = action.payload.navigationTitle;
    },
    sideBar: (state, action) => {
      state.setState = action.payload.setState;
    },
  },
});

export const navigationReducer = navigationSlice.reducer;
export const navigationData = (state) => state;
// export const navigationData = ({ navigation }) => navigation;
export const { navigation } = navigationSlice.actions;
export const { sideBar } = navigationSlice.actions;

export default navigationSlice.reducer;
