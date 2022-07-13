import styles from "./EventList.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Event from "./Event/Event";
import { clsx } from "clsx";
import { setSearchOption } from "../../store/mainSlice";
import { filters, sorts } from "../../data/FiltersAndSors";

const EventList = () => {
  const { sortedList, filter, sort } = useAppSelector(
    (state) => state.mainSlice
  );
  const dispatch = useAppDispatch();
  return (
    <div className={clsx(styles.eventList, "container")}>
      <div className={styles.sort}>
        Sort by:
        {sorts.map((i) => (
          <span
            key={i}
            className={clsx(sort === i && styles.active)}
            onClick={() =>
              dispatch(setSearchOption({ option: "sort", value: i }))
            }
          >
            {i}
          </span>
        ))}
      </div>
      <div className={styles.sort}>
        Filter by:
        {filters.map((i) => (
          <span
            key={i}
            className={clsx(filter === i && styles.active)}
            onClick={() =>
              dispatch(setSearchOption({ option: "filter", value: i }))
            }
          >
            {i}
          </span>
        ))}
      </div>
      {sortedList.length > 0 && (
        <div className={styles.title}>
          <h2>Your Event List:</h2>
        </div>
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
          priority={i.priority}
        />
      ))}
    </div>
  );
};

export default EventList;
