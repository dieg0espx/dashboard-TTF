import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useActionData } from "react-router-dom";
import Orders from './pages/Orders';
import Order from './pages/Order';
import Sheet from './pages/Sheet';
import NewOrder from './pages/NewOrder';
import Trucks from './pages/Trucks';
import Payroll from './pages/Payroll';
import PrintPayroll from './pages/PrintPayroll';
import Inventory from './pages/Inventory';
import Forklifts from './pages/Forklifts';
import Damages from './pages/Damages';

function App() {
  return (
    <div>
      {/* <Router> */}
        <div className="App">
          <Routes>
            <Route path='/'  element={<Orders />} />
          </Routes>
          <Routes>
            <Route path='/orders'  element={<Orders />} />
          </Routes>
          <Routes>
            <Route path='/order'  element={<Order />} />
          </Routes>
          <Routes>
            <Route path='/sheet'  element={<Sheet />} />
          </Routes>
          <Routes>
            <Route path='/newOrder'  element={<NewOrder />} />
          </Routes>
          <Routes>
            <Route path='/trucks'  element={<Trucks />} />
          </Routes>
          <Routes>
            <Route path='/payroll'  element={<Payroll />} />
          </Routes>
          <Routes>
            <Route path='/printPayroll'  element={<PrintPayroll />} />
          </Routes>
          <Routes>
            <Route path='/inventory'  element={<Inventory />} />
          </Routes>
          <Routes>
            <Route path='/forklifts'  element={<Forklifts />} />
          </Routes>
          <Routes>
            <Route path='/damages'  element={<Damages />} />
          </Routes>
        </div>
      {/* </Router> */}
    </div>
  );
}

export default App;
