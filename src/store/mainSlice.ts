import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../@types/IEvent";
import { MainState } from "../@types/IMainState";
import { calculateDaysBefore } from "../utils/calculateDaysBefore";

const initialState: MainState = {
  eventsList: [],
  sortedList: [],
  sort: "Title",
  filter: "All",
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
    updateEvent: (state, action: PayloadAction<IEvent>) => {
      const { daysBefore, years } = calculateDaysBefore({ ...action.payload });
      state.eventsList = state.eventsList.map((i) =>
        i.id === action.payload.id
          ? {
              ...action.payload,
              daysBefore,
              years,
            }
          : { ...i }
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
            ? a.daysBefore[0] - b.daysBefore[0]
            : state.sort === "Title"
            ? a.name.localeCompare(b.name)
            : b.priority - a.priority;
        });
    },
    updateDaysBefore: (state) => {
      state.eventsList = state.eventsList.map((i) => {
        const { daysBefore, years } = calculateDaysBefore({
          ...i,
        });
        return { ...i, daysBefore, years };
      });
      mainSlice.caseReducers.setSortedList(state);
    },
  },
});

export const {
  addNewEvent,
  deleteEvent,
  setSearchOption,
  updateEvent,
  updateDaysBefore,
} = mainSlice.actions;
export default mainSlice.reducer;
