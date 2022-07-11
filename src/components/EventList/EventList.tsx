import styles from "./EventList.module.scss";
import { useAppSelector } from "../../hooks/redux";
import Event from "./Event/Event";

const EventList = () => {
  const { eventsList } = useAppSelector((state) => state.mainSlice);
  return (
    <div className={styles.eventList}>
      {eventsList.length > 0 && (
        <h2 className={styles.title}>Your Event List:</h2>
      )}
      {eventsList.length < 1 && <h2 className={styles.title}>No Event!</h2>}
      {eventsList.map((i) => (
        <Event
          name={i.name}
          date={i.date}
          image={i.image}
          id={i.id}
          key={i.id}
          type={i.type}
        />
      ))}
    </div>
  );
};

export default EventList;
