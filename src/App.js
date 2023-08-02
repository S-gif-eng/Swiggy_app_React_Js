
import './App.css';
import Dishes from './components/Dishes';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Offers from "./components/Offers";
import RestaurantsFood from './components/RestaurantsFood';
import GetLocation from  './components/GetLocation';
import Footer from './components/Footer';
import Footer1 from './components/Footer1';
import Footer2 from './components/Footer2';
import Footer3 from './components/Footer3';
import Footer4 from './components/Footer4';


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
    
 <div className="footer">
  <Footer />
 </div>
 <div className="footer1">
  <Footer1 />
 </div>
 <div className="footer2">
  <Footer2 />
 </div>
 <div className="footer3">
  <Footer3 />
 </div>
 <div className="footer4">
 <Footer4 />
</div>
    </div>
  );
}

export default App;
