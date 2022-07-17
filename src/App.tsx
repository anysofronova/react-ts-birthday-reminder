import AddEvent from "./components/AddEvent/AddEvent";
import Header from "./components/Header/Header";
import EventList from "./components/EventList/EventList";
import Footer from "./components/Footer/Footer";

function App() {
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
