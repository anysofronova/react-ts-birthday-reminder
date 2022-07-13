import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./Form.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { IEvent } from "../../../@types/IEvent";
import { useAppDispatch } from "../../../hooks/redux";
import { v4 as uuidv4 } from "uuid";
import range from "lodash/range";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IFormProps {
  buttonText: string;
  dispatchName: ActionCreatorWithPayload<IEvent>;
  eventInfo?: IEvent;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
}

const Form: FC<IFormProps> = ({
  buttonText,
  dispatchName,
  eventInfo,
  setEditMode,
}) => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IEvent>({
    defaultValues: {
      name: eventInfo?.name || "",
      image: eventInfo?.image || "",
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IEvent> = (formData) => {
    dispatch(
      dispatchName({
        name: formData.name,
        image: formData.image,
        id: eventInfo?.id || uuidv4(),
        type: switcher,
        priority: priority,
        date: moment(startDate).format("YYYY-MM-DD"),
      })
    );
    if (setEditMode) {
      setEditMode(false);
    }
    reset();
  };
  const [startDate, setStartDate] = useState<Date | null>(
    eventInfo ? new Date(eventInfo.date) : new Date()
  );
  const [switcher, setSwitcher] = useState<"Event" | "Birthday">(
    eventInfo?.type || "Event"
  );
  const [priority, setPriority] = useState<0 | 1 | 2>(eventInfo?.priority || 2);
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
        <label htmlFor={`${eventInfo?.id}01`}>
          <input
            {...register("type", { required: true })}
            type="radio"
            id={`${eventInfo?.id}01`}
            value="Event"
            checked={switcher === "Event"}
            onChange={() => setSwitcher("Event")}
          />
          Event
        </label>
        <label htmlFor={`${eventInfo?.id}02`}>
          <input
            {...register("type", { required: true })}
            type="radio"
            id={`${eventInfo?.id}02`}
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
            renderCustomHeader={({ date, changeYear, changeMonth }) => (
              <div className={styles.calendar} style={{}}>
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
              </div>
            )}
            selected={startDate}
            onChange={(e) => setStartDate(e)}
            placeholderText="Select date"
            dateFormat="dd/MM/yyyy"
          />
        )}
      />
      <div className={styles.priority}>
        <label htmlFor={`${eventInfo?.id}11`}>
          <input
            {...register("priority", { required: true })}
            type="radio"
            id={`${eventInfo?.id}11`}
            value="Event"
            checked={priority === 2}
            className={styles.priority2}
            onChange={() => setPriority(2)}
          />
          Important
        </label>
        <label htmlFor={`${eventInfo?.id}12`}>
          <input
            {...register("priority", { required: true })}
            type="radio"
            id={`${eventInfo?.id}12`}
            value="Birthday"
            checked={priority === 1}
            onChange={() => setPriority(1)}
            className={styles.priority1}
          />
          Moderately
        </label>
        <label htmlFor={`${eventInfo?.id}13`}>
          <input
            {...register("priority", { required: true })}
            type="radio"
            id={`${eventInfo?.id}13`}
            value="0"
            checked={priority === 0}
            onChange={() => setPriority(0)}
            className={styles.priority0}
          />
          Unimportant
        </label>
      </div>
      <input
        {...register("image")}
        placeholder={"Enter link to Photo"}
        type={"text"}
      />
      <button className={styles.button}>{buttonText}</button>
      {setEditMode && (
        <button className={styles.button} onClick={() => setEditMode(false)}>
          Cancel
        </button>
      )}
      {(errors?.name?.type === "required" ||
        errors?.type?.type === "required") && (
        <p className={styles.error}>The fields are required</p>
      )}
      {errors?.name?.type === "maxLength" && (
        <p className={styles.error}>Name cannot exceed 30 characters</p>
      )}
    </form>
  );
};

export default Form;
