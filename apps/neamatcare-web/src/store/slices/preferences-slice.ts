import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type PreferencesState = {
  /** Technician availability toggle (PDF: on duty / off duty / on leave). */
  onDuty: boolean;
  /** Live location sharing — only while on duty, with an explicit on/off toggle. */
  shareLocation: boolean;
};

const initialState: PreferencesState = { onDuty: false, shareLocation: false };

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setOnDuty: (state, action: PayloadAction<boolean>) => {
      state.onDuty = action.payload;
      // Location sharing never outlives the duty status (privacy rule in the plan).
      if (!action.payload) state.shareLocation = false;
    },
    setShareLocation: (state, action: PayloadAction<boolean>) => {
      state.shareLocation = state.onDuty && action.payload;
    },
  },
});

export const { setOnDuty, setShareLocation } = preferencesSlice.actions;
