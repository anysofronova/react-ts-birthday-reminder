import moment from "moment";

import { IEvent } from "../@types";

export const calculateDaysBefore = ({ date, type }: IEvent) => {
  const today: Date = new Date();
  const splitDate: string[] = date.split(" ")[0].split("-");
  const splitTime: string[] = date.split(" ")[1].split(":");
  let event: Date;
  if (type === "Birthday") {
    event = new Date(
      today.getFullYear(),
      +splitDate[1] - 1,
      +splitDate[2],
      +splitTime[0],
      +splitTime[1]
    );
    if (today.getTime() > event.getTime())
      event.setFullYear(event.getFullYear() + 1);
  } else {
    event = new Date(
      +splitDate[0],
      +splitDate[1] - 1,
      +splitDate[2],
      +splitTime[0],
      +splitTime[1]
    );
  }
  if (
    type === "Birthday" &&
    today.getFullYear() === event.getFullYear() &&
    today.getMonth() === event.getMonth() &&
    today.getDate() === event.getDate()
  )
    return { daysBefore: [0], years: -1 };
  if (type === "Event" && today.getTime() > new Date(date).getTime())
    return { daysBefore: [-1], years: -1 };
  let delta = Math.abs(event.getTime() - today.getTime()) / 1000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;

  return {
    daysBefore: [days, hours, minutes],
    years: +moment().diff(moment(date, "YYYYMMDD"), "years") + 1,
  };
};
