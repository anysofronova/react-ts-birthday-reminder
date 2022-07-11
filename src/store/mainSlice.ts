import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../@types/IEvent";

export interface MainState {
  eventsList: IEvent[];
}

const initialState: MainState = {
  eventsList: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addNewEvent: (state, action: PayloadAction<IEvent>) => {
      state.eventsList.push({ ...action.payload });
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.eventsList = state.eventsList.filter(
        (i) => i.id !== action.payload
      );
    },
  },
});

export const { addNewEvent, deleteEvent } = mainSlice.actions;
export default mainSlice.reducer;
