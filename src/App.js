
import './App.css';
import Dishes from './components/Dishes';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Offers from "./components/Offers";
import RestaurantsFood from './components/RestaurantsFood';
import GetLocation from  './components/GetLocation';
import Footer from './components/Footer';
import Footer1 from './components/Footer';

function App() {
  return (
    <div className="App">
    <Navbar />
<div className='header'>
    <Offers/>
    <Dishes />
    </div>
    <div className="body">
    <Menu />
    <RestaurantsFood />
    </div>
    
 <div className="footer1">
  <Footer />
 </div>
    </div>
  );
}

export default App;
