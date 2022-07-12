import { IEvent } from "../@types/IEvent";
import moment from "moment";

export const calculateDaysBefore = ({ date, type }: IEvent) => {
  const today: Date = new Date();
  const splitDate: string[] = date.split("-");
  let event: Date;
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
  let delta = Math.abs(event.getTime() - today.getTime()) / 1000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;

  return {
    daysBefore: `${days} d ${hours} h before`,
    years: +moment().diff(moment(date, "YYYYMMDD"), "years") + 1,
  };
};
