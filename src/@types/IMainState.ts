import { IEvent } from "./IEvent";

export interface MainState {
  eventsList: IEvent[];
  sortedList: IEvent[];
  type: string;
  date: string;
}
