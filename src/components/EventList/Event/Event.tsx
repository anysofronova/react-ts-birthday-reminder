import styles from "./Event.module.scss";
import { FC, useState } from "react";
import { IEvent } from "../../../@types/IEvent";
import placeholder from "../../../assets/imgPlaceholder.jpeg";
import { clsx } from "clsx";
import { useAppDispatch } from "../../../hooks/redux";
import { deleteEvent, updateEvent } from "../../../store/mainSlice";
import moment from "moment";
import Form from "../../AddEvent/Form/Form";

const Event: FC<IEvent> = ({
  image,
  name,
  date,
  type,
  id,
  daysBefore,
  years,
  priority,
}) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <>
      {!editMode && (
        <div
          className={clsx(
            styles.event,
            priority === 2
              ? styles.event2
              : priority === 1
              ? styles.event1
              : styles.event0
          )}
        >
          <div className={styles.image}>
            <img src={image || placeholder} alt="Event" />
          </div>
          <div className={styles.info}>
            <div className={styles.buttons}>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={() => dispatch(deleteEvent(id))}>╳</button>
            </div>
            <div className={styles.type}>
              {type} – {moment(date).format("MMMM Do YYYY, HH:mm")}
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.date}>
              {daysBefore.length > 1
                ? `${daysBefore[0]}d ${daysBefore[1]}h ${daysBefore[2]}m before`
                : daysBefore[0] === 0
                ? "Today"
                : "Sorry you're late"}
            </div>
            {type === "Birthday" && (
              <div className={styles.date}>Will be {years} years old</div>
            )}
          </div>
        </div>
      )}
      {editMode && (
        <div className={clsx(styles.edit, styles.event)}>
          <Form
            buttonText={"Update"}
            dispatchName={updateEvent}
            eventInfo={{
              name,
              type,
              image,
              id,
              date,
              priority,
              daysBefore,
              years,
            }}
            setEditMode={setEditMode}
          />
        </div>
      )}
    </>
  );
};

export default Event;
