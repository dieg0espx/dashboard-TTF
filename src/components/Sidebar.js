import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'


function Sidebar() {
    const[selected, setSelected] = useState(0);
    const [isMobile, setIsMobile] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(()=>{
      if(window.innerWidth < 600){
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    },[])

  return (
    <div>
    <div className={isMobile? "wrapper-topbar":"wrapper-sidebar"}>
        <img src={logo}></img>
        <i className="bi bi-list iconMenu" onClick={()=>setShowMenu(!showMenu)}></i>
        <div className='menu' style={{display: isMobile?"none":"block"}}>
            <button onClick={()=>window.location.href = '#/orders'}> <i className="bi bi-list-check"></i> Orders </button>
            <button onClick={()=>window.location.href = '#/trucks'}> <i className="bi bi-truck"></i> Trucks </button>
            <button onClick={()=>window.location.href = '#/inventory'}> <i className="bi bi-boxes"></i> Inventory </button>
            <button onClick={()=>window.location.href = '#/damages'}> <i className="bi bi-shield-exclamation"></i> Damages </button>
            <button onClick={()=>window.location.href = '#/forklifts'}> <i className="bi bi-gear"></i> Forklifts </button>
            {/* <button onClick={()=>window.location.href = '#/truckWeight'}> <i className="bi bi-truck-front"></i> Truck Weight </button> */}
            <button onClick={()=>window.location.href = '#/payroll'}> <i className="bi bi-clock"></i> Payroll </button>
        </div>
    </div>
       <div className='mobileMenu' style={{display: isMobile && showMenu?"block":"none"}}>
       <button onClick={()=>window.location.href = '#/orders'}> <i className="bi bi-list-check"></i> Orders </button>
       <button onClick={()=>window.location.href = '#/trucks'}> <i className="bi bi-truck"></i> Trucks </button>
       <button onClick={()=>window.location.href = '#/inventory'}> <i className="bi bi-boxes"></i> Inventory </button>
       <button onClick={()=>window.location.href = '#/damages'}> <i className="bi bi-shield-exclamation"></i> Damages </button>
       <button onClick={()=>window.location.href = '#/forklifts'}> <i className="bi bi-gear"></i> Forklifts </button>
       {/* <button onClick={()=>window.location.href = '#/truckWeight'}> <i className="bi bi-truck-front"></i> Truck Weight </button> */}
       <button onClick={()=>window.location.href = '#/payroll'}> <i className="bi bi-clock"></i> Payroll </button>
   </div>
    </div>
  )
}
 
export default Sidebar
