import styles from "./AddEvent.module.scss";
import { FC, memo, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { addNewEvent } from "../../store/mainSlice";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IEvent } from "../../@types/IEvent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import range from "lodash/range";

const AddEvent: FC = memo(() => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IEvent>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IEvent> = (formData) => {
    dispatch(
      addNewEvent({
        name: formData.name,
        image: formData.image,
        id: uuidv4(),
        type: switcher,
        date: moment(startDate).format("YYYY-MM-DD"),
      })
    );
    reset();
  };
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [switcher, setSwitcher] = useState<"Event" | "Birthday">("Event");
  const years = range(1900, getYear(new Date()) + 10, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className={"container"}>
      <p>Add New Event</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("name", {
            required: true,
            maxLength: 30,
          })}
          type={"text"}
          placeholder={"Name"}
        />
        <div className={styles.switch}>
          <label htmlFor="event">
            <input
              {...register("type", { required: true })}
              type="radio"
              id="event"
              value="Event"
              checked={switcher === "Event"}
              onChange={() => setSwitcher("Event")}
            />
            Event
          </label>
          <label htmlFor="birthday">
            <input
              {...register("type", { required: true })}
              type="radio"
              id="birthday"
              value="Birthday"
              checked={switcher === "Birthday"}
              onChange={() => setSwitcher("Birthday")}
            />
            Birthday
          </label>
        </div>
        <Controller
          name="date"
          control={control}
          defaultValue={moment(new Date()).format("YYYY-MM-DD")}
          render={() => (
            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className={styles.calendar} style={{}}>
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(+value)}
                  >
                    {years.map((option: number) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={startDate}
              onChange={(e) => setStartDate(e)}
              placeholderText="Select date"
              dateFormat="dd/MM/yyyy"
            />
          )}
        />
        <input
          {...register("image")}
          placeholder={"Enter link to Photo"}
          type={"text"}
        />
        <button className={styles.button}>Add</button>
        {(errors?.name?.type === "required" ||
          errors?.type?.type === "required") && (
          <p className={styles.error}>The fields are required</p>
        )}
        {errors?.name?.type === "maxLength" && (
          <p className={styles.error}>Name cannot exceed 30 characters</p>
        )}
      </form>
    </div>
  );
});

export default AddEvent;
