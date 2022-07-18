import AddEvent from "./components/AddEvent/AddEvent";
import Header from "./components/Header/Header";
import EventList from "./components/EventList/EventList";
import Footer from "./components/Footer/Footer";
import { useAppDispatch } from "./hooks/redux";
import { updateDaysBefore } from "./store/mainSlice";

function App() {
  const dispatch = useAppDispatch();
  setInterval(() => dispatch(updateDaysBefore()), 60000);
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
