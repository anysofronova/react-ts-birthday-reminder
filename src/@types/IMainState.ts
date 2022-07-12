import { IEvent } from "./IEvent";

export interface MainState {
  eventsList: IEvent[];
  sortedList: IEvent[];
  sort: string;
  filter: string;
}
