import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  /** Site search dialog — wired to the header search button. */
  searchOpen: boolean;
};

const initialState: UiState = { searchOpen: false };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.searchOpen = true;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
  },
});

export const { openSearch, closeSearch } = uiSlice.actions;
