import AddEvent from "./components/AddEvent/AddEvent";
import Header from "./components/Header/Header";
import EventList from "./components/EventList/EventList";
import Footer from "./components/Footer/Footer";
import { useAppDispatch } from "./hooks/redux";
import { updateDaysBefore } from "./store/mainSlice";
import { useEffect } from "react";

function App() {
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
}

export default App;
