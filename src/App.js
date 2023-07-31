
import './App.css';
import Dishes from './components/Dishes';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Offers from "./components/Offers";
import RestaurantsFood from './components/RestaurantsFood';

function App() {
  return (
    <div className="App">
    <Navbar />
    <Offers/>
    <Dishes />
    <Menu />
    <RestaurantsFood />
    </div>
  );
}

export default App;
