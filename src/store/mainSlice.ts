import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../@types/IEvent";
import { MainState } from "../@types/IMainState";
import { calculateDaysBefore } from "../utils/calculateDaysBefore";

const initialState: MainState = {
  eventsList: [],
  sortedList: [],
  type: "",
  date: "",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addNewEvent: (state, action: PayloadAction<IEvent>) => {
      const { daysBefore, years } = calculateDaysBefore({ ...action.payload });
      state.eventsList.push({ ...action.payload, daysBefore, years });
      mainSlice.caseReducers.sortList(state);
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.eventsList = state.eventsList.filter(
        (i) => i.id !== action.payload
      );
      mainSlice.caseReducers.sortList(state);
    },
    sortList: (state) => {
      state.sortedList = state.eventsList.sort(
        (a, b) => +new Date(a.date) - +new Date(b.date)
      );
    },
  },
});

export const { addNewEvent, deleteEvent } = mainSlice.actions;
export default mainSlice.reducer;
