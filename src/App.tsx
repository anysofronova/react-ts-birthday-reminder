import { useEffect } from "react";

import { useAppDispatch } from "./hooks";
import { updateDaysBefore } from "./store/mainSlice";
import { AddEvent, EventList, Footer, Header } from "./components";

export const App = () => {
  const dispatch = useAppDispatch();

  setInterval(() => dispatch(updateDaysBefore()), 60000);
  useEffect(() => {
    updateDaysBefore();
  }, []);

  return (
    <div className="App">
      <Header />
      <AddEvent />
      <EventList />
      <Footer />
    </div>
  );
};
