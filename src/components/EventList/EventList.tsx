import styles from "./EventList.module.scss";
import { useAppSelector } from "../../hooks/redux";
import Event from "./Event/Event";

const EventList = () => {
  const { sortedList } = useAppSelector((state) => state.mainSlice);
  return (
    <div className={styles.eventList}>
      {sortedList.length > 0 && (
        <h2 className={styles.title}>Your Event List:</h2>
      )}
      {sortedList.length < 1 && <h2 className={styles.title}>No Event!</h2>}
      {sortedList.map((i) => (
        <Event
          name={i.name}
          date={i.date}
          image={i.image}
          id={i.id}
          key={i.id}
          type={i.type}
          daysBefore={i.daysBefore}
          years={i.years}
        />
      ))}
    </div>
  );
};

export default EventList;
