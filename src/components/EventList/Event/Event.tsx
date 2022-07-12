import styles from "./Event.module.scss";
import { FC } from "react";
import { IEvent } from "../../../@types/IEvent";
import placeholder from "../../../assets/imgPlaceholder.jpeg";
import { clsx } from "clsx";
import { useAppDispatch } from "../../../hooks/redux";
import { deleteEvent } from "../../../store/mainSlice";
import moment from "moment";

const Event: FC<IEvent> = ({
  image,
  name,
  date,
  type,
  id,
  daysBefore,
  years,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={clsx(styles.event)}>
      <div className={styles.image}>
        <img src={image || placeholder} alt="Event" />
      </div>
      <div className={styles.info}>
        <div className={styles.buttons}>
          <button onClick={() => dispatch(deleteEvent(id))}>╳</button>
        </div>
        <div className={styles.type}>{type}</div>
        <div className={styles.name}>
          {name} – {moment(date).format("MMMM Do YYYY")}
        </div>
        <div className={styles.date}>{daysBefore}</div>
        {type === "Birthday" && <div>Will be {years} years old</div>}
      </div>
    </div>
  );
};

export default Event;
