import { FC, memo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Form from "./Form/Form";
import { addNewEvent } from "../../store/mainSlice";

const AddEvent: FC = memo(() => {
  return (
    <div className={"container"}>
      <p>Add New Event</p>
      <Form buttonText={"Add"} dispatchName={addNewEvent} />
    </div>
  );
});

export default AddEvent;
