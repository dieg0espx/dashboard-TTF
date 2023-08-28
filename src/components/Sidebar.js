import React, { useState } from 'react'
import logo from '../images/logo.png'


function Sidebar() {
    const[selected, setSelected] = useState(0);

    console.log(window.location.pathname);

  return (
    <div className='wrapper-sidebar'>
        <img src={logo}></img>
        <div className='menu'>
            <button className={window.location.pathname == '/orders'      ? "selected":""} onClick={()=>window.location.href = '/orders'}> <i className="bi bi-list-check"></i> Orders </button>
            <button className={window.location.pathname == '/trucks'      ? "selected":""} onClick={()=>window.location.href = '/trucks'}> <i className="bi bi-truck"></i> Trucks </button>
            <button className={window.location.pathname == '/inventory'   ? "selected":""} onClick={()=>window.location.href = '/inventory'}> <i className="bi bi-boxes"></i> Inventory </button>
            <button className={window.location.pathname == '/damages'     ? "selected":""} onClick={()=>window.location.href = '/damages'}> <i className="bi bi-shield-exclamation"></i> Damages </button>
            <button className={window.location.pathname == '/forklift'    ? "selected":""} onClick={()=>window.location.href = '/forklift'}> <i className="bi bi-gear"></i> Forklifts </button>
            <button className={window.location.pathname == '/truckWeight' ? "selected":""} onClick={()=>window.location.href = '/truckWeight'}> <i className="bi bi-truck-front"></i> Truck Weight </button>
            <button className={window.location.pathname == '/payroll'     ? "selected":""} onClick={()=>window.location.href = '/payroll'}> <i className="bi bi-clock"></i> Payroll </button>
        </div>
    </div>
  )
}
 
export default Sidebar
