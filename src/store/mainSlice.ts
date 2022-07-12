import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../@types/IEvent";
import { MainState } from "../@types/IMainState";
import { calculateDaysBefore } from "../utils/calculateDaysBefore";

const initialState: MainState = {
  eventsList: [],
  sortedList: [],
  sort: "title",
  filter: "all",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addNewEvent: (state, action: PayloadAction<IEvent>) => {
      const { daysBefore, years } = calculateDaysBefore({ ...action.payload });
      state.eventsList.push({ ...action.payload, daysBefore, years });
      mainSlice.caseReducers.setSortedList(state);
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.eventsList = state.eventsList.filter(
        (i) => i.id !== action.payload
      );
      mainSlice.caseReducers.setSortedList(state);
    },
    setSearchOption: (
      state,
      action: PayloadAction<{ value: string; option: "sort" | "filter" }>
    ) => {
      state[action.payload.option] = action.payload.value;
      mainSlice.caseReducers.setSortedList(state);
    },
    setSortedList: (state) => {
      state.sortedList = state.eventsList
        .filter((i) =>
          state.filter === "Event"
            ? i.type === "Event"
            : state.filter === "Birthday"
            ? i.type === "Birthday"
            : i.type
        )
        .sort((a, b) => {
          return state.sort === "Date"
            ? +new Date(a.date) - +new Date(b.date)
            : a.name.localeCompare(b.name);
        });
    },
  },
});

export const { addNewEvent, deleteEvent, setSearchOption } = mainSlice.actions;
export default mainSlice.reducer;
