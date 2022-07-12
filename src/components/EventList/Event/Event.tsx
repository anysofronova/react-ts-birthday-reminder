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
}) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <>
      {!editMode && (
        <div className={clsx(styles.event)}>
          <div className={styles.image}>
            <img src={image || placeholder} alt="Event" />
          </div>
          <div className={styles.info}>
            <div className={styles.buttons}>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={() => dispatch(deleteEvent(id))}>╳</button>
            </div>
            <div className={styles.type}>{type}</div>
            <div className={styles.name}>
              {name} – {moment(date).format("MMMM Do YYYY")}
            </div>
            <div className={styles.date}>{daysBefore}</div>
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
            eventInfo={{ name, type, image, id, date }}
            setEditMode={setEditMode}
          />
        </div>
      )}
    </>
  );
};

export default Event;
