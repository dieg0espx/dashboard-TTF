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
      let url = window.location.toString()
      let currrentPage = url.split('#/')[1];

      switch (currrentPage) {
        case 'orders':
          setSelected(0)
          break;
        case 'trucks':
          setSelected(1)
          break
        case 'inventory':
          setSelected(2)
          break
        case 'damages':
          setSelected(3)
          break
        case 'forklifts':
          setSelected(4)
          break
        case 'payroll':
          setSelected(5)
          break
        case 'mailing':
          setSelected(6)
          break
        default:
          break;
      }


    },[])



  return (
    <div>
    <div className={isMobile? "wrapper-topbar":"wrapper-sidebar"}>
        <img src={logo}></img>
        <i className={isMobile && showMenu ? "bi bi-x-lg iconMenu":"bi bi-list iconMenu"} style={{display: isMobile? "block":"none"}} onClick={()=>setShowMenu(!showMenu)}></i>
        <div className='menu' style={{display: isMobile?"none":"block"}}>
            <button className={selected == 0? "selected":""} onClick={()=>window.location.href = '#/orders'}>    <i className="bi bi-list-check"></i> Orders </button>
            <button className={selected == 1? "selected":""} onClick={()=>window.location.href = '#/trucks'}>    <i className="bi bi-truck"></i> Trucks </button>
            <button className={selected == 2? "selected":""} onClick={()=>window.location.href = '#/inventory'}> <i className="bi bi-boxes"></i> Inventory </button>
            {/* <button className={selected == 3? "selected":""} onClick={()=>window.location.href = '#/damages'}>   <i className="bi bi-shield-exclamation"></i> Damages </button> */}
            <button className={selected == 4? "selected":""} onClick={()=>window.location.href = '#/forklifts'}> <i className="bi bi-gear"></i> Forklifts </button>
            <button className={selected == 5? "selected":""} onClick={()=>window.location.href = '#/payroll'}>   <i className="bi bi-clock"></i> Payroll </button>
            <button className={selected == 6? "selected":""} onClick={()=>window.location.href = '#/mailing'}>   <i className="bi bi-envelope-at"></i> Mailing </button>
        </div>
    </div>
       <div className='mobileMenu' style={{display: isMobile && showMenu?"block":"none"}}>
        <button className={selected == 0? "selected":""} onClick={()=>window.location.href = '#/orders'}>    <i className="bi bi-list-check"></i> Orders </button>
        <button className={selected == 1? "selected":""} onClick={()=>window.location.href = '#/trucks'}>    <i className="bi bi-truck"></i> Trucks </button>
        <button className={selected == 2? "selected":""} onClick={()=>window.location.href = '#/inventory'}> <i className="bi bi-boxes"></i> Inventory </button>
        {/* <button className={selected == 3? "selected":""} onClick={()=>window.location.href = '#/damages'}>   <i className="bi bi-shield-exclamation"></i> Damages </button> */}
        <button className={selected == 4? "selected":""} onClick={()=>window.location.href = '#/forklifts'}> <i className="bi bi-gear"></i> Forklifts </button>
        <button className={selected == 5? "selected":""} onClick={()=>window.location.href = '#/payroll'}>   <i className="bi bi-clock"></i> Payroll </button>
        <button className={selected == 6? "selected":""} onClick={()=>window.location.href = '#/mailing'}>   <i className="bi bi-envelope-at"></i> Mailing </button>
       </div>
    </div>
  )
}
 
export default Sidebar
