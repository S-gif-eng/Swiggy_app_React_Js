
import './App.css';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Offers from "./components/Offers"

function App() {
  return (
    <div className="App">
    <Navbar />
    <Offers/>
    <Menu />
    </div>
  );
}

export default App;
