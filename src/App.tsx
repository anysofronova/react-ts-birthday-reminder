import AddEvent from "./components/AddEvent/AddEvent";
import Header from "./components/Header/Header";
import EventList from "./components/EventList/EventList";

function App() {
  return (
    <div className="App">
      <Header />
      <AddEvent />
      <EventList />
    </div>
  );
}

export default App;
