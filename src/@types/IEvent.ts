export interface IEvent {
  id: string;
  name: string;
  date: string;
  image: string;
  type: "Birthday" | "Event";
  years?: number;
  daysBefore?: number | string;
}
