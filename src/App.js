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
import ProtectedRoutes from './ProtectedRoutes';
import ReturnSheet from './pages/ReturnSheet';
import Mailing from './pages/Mailing';

function App() {

  return (
    <div>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Orders />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/order' element={<Order />} />
            <Route path='/sheet' element={<Sheet />} />
            <Route path='/return-sheet' element={<ReturnSheet />} />
            <Route path='/newOrder' element={<NewOrder />} />
            <Route path='/trucks' element={<Trucks />} />
            <Route path='/payroll' element={<Payroll />} />
            <Route path='/printPayroll' element={<PrintPayroll />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/forklifts' element={<Forklifts />} />
            <Route path='/damages' element={<Damages />} />
            <Route path='/mailing' element={<Mailing />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;


