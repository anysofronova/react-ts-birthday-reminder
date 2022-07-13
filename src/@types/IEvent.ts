export interface IEvent {
  id: string;
  name: string;
  date: string;
  image: string;
  type: "Birthday" | "Event";
  priority: 0 | 1 | 2;
  years?: number;
  daysBefore?: number | string;
}
