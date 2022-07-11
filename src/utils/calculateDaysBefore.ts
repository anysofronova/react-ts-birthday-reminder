import { IEvent } from "../@types/IEvent";
import moment from "moment";

export const calculateDaysBefore = ({ date, type }: IEvent) => {
  const today = new Date();
  const splitDate = date.split("-");
  let event;
  if (type === "Birthday") {
    event = new Date(today.getFullYear(), +splitDate[1] - 1, +splitDate[2]);
    if (today.getTime() > event.getTime())
      event.setFullYear(event.getFullYear() + 1);
  } else {
    event = new Date(+splitDate[0], +splitDate[1] - 1, +splitDate[2]);
  }
  if (
    today.getDay() === event.getDay() &&
    today.getMonth() === event.getMonth() &&
    today.getDay() === event.getDay()
  ) {
    return { daysBefore: "Today", years: -1 };
  }

  if (type === "Event" && today.getTime() > new Date(date).getTime()) {
    return { daysBefore: "Sorry, you're late", years: -1 };
  }

  const diff = event.getTime() - today.getTime();
  return {
    daysBefore: Math.floor(diff / (1000 * 60 * 60 * 24)),
    years: +moment().diff(moment(date, "YYYYMMDD"), "years") + 1,
  };
};
