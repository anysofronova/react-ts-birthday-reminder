import styles from "./Event.module.scss";
import { FC } from "react";
import { IEvent } from "../../../@types/IEvent";
import placeholder from "../../../assets/imgPlaceholder.jpeg";
import { clsx } from "clsx";
import { useAppDispatch } from "../../../hooks/redux";
import { deleteEvent } from "../../../store/mainSlice";
import moment from "moment";

const Event: FC<IEvent> = ({ image, name, date, type, id }) => {
  const dayBefore = () => {
    const today = new Date();
    if (type === "Event" && today.getTime() > new Date(date).getTime()) {
      return ["Sorry, you're late", -1];
    }
    const splitDate = date.split("-");
    let event;
    if (type === "Birthday") {
      event = new Date(today.getFullYear(), +splitDate[1] - 1, +splitDate[2]);
      if (today.getTime() > event.getTime())
        event.setFullYear(event.getFullYear() + 1);
    } else {
      event = new Date(+splitDate[0], +splitDate[1] - 1, +splitDate[2]);
    }

    const diff = event.getTime() - today.getTime();
    return [
      Math.floor(diff / (1000 * 60 * 60 * 24)),
      +moment().diff(moment(date, "YYYYMMDD"), "years") + 1,
    ];
  };
  const dispatch = useAppDispatch();
  const days = dayBefore();
  return (
    <div className={clsx("container", styles.event)}>
      <div className={styles.image}>
        <img src={image || placeholder} alt="Event" />
      </div>
      <div className={styles.info}>
        <div className={styles.type}>
          {type}
          <button onClick={() => dispatch(deleteEvent(id))}>╳</button>
        </div>
        <div className={styles.name}>
          {name} – {moment(date).format("MMMM Do YYYY")}
        </div>
        <div className={styles.date}>
          {days[0]} {days[1] !== -1 && "days before"}
        </div>
        {type === "Birthday" && <div>Will be {days[1]}</div>}
      </div>
    </div>
  );
};

export default Event;
