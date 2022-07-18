import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IEvent } from "./IEvent";
import { Dispatch, SetStateAction } from "react";

export interface IFormProps {
  buttonText: string;
  dispatchName: ActionCreatorWithPayload<IEvent>;
  eventInfo?: IEvent;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
}
