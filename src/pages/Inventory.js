import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Switch from "react-switch";

function Inventory() {

    const [inventory, setInventory] = useState([])
    const [finding, setFinding] = useState('')
    const [selectedCompany, setSelectedCompany] = useState([])
    const [showCero, setShowCero] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)


    useEffect(()=>{
        getInventory()
    },[])

    async function getInventory() {
        fetch('https://script.google.com/macros/s/AKfycbw9W1Ctu9286GWSJf6Db2HyNY7gKzbjVLE3QvAompXgf8Gk3K902DiUIvH9nWSx9_v0zQ/exec')
          .then(response => response.json())
          .then(response => setInventory(response.slice(1)))
      }
      

    function onCompanySelected(code, company, jobsite){
        let array = {code, company, jobsite}
        setSelectedCompany(array)
        setShowSidebar(true)
    }

    
  return (
    <div className='wrapper-inventory'>
        <Sidebar/>
        <div className='content'>
            <div className='header'>
                <h1> Inventory </h1>
                
                <div className='action-btns'>
                    <input type='text' placeholder='Find Company' onChange={(e)=>setFinding(e.target.value)}/>
                    <i className="bi bi-search searchIcon"></i>
                    <i className="bi bi-layout-sidebar-inset-reverse sidebarIcon" onClick={()=>setShowSidebar(!showSidebar)}></i>
                </div>
            </div>
            <div className='main-grid' style={{display: showSidebar? "grid":"block"}}>
                <div className='rows'>
                    {inventory.map((row) => {
                        if (row[1].includes(finding.toUpperCase())) {
                            return (
                                <div className='row' key={row[0]} onClick={()=>onCompanySelected(row[0], row[1], row[2])}> 
                                    <p id="company"> {row[0]} - {row[1]}</p>
                                    <p id="jobsite"> {row[2]}</p>
                                </div>
                            );
                            }
                        return null;
                    })}
                </div>
                <div className='sideBar' style={{display: showSidebar? "block":"none"}}>
                    <div className='two-col' style={{display: selectedCompany.code ? "flex":"none"}}>
                        <p id="code"><b>CODE:</b> {selectedCompany.code} </p>
                        <div>
                        <Switch onChange={()=>setShowCero(!showCero)} checked={showCero} uncheckedIcon={false} checkedIcon={false} onColor='#65D1B5'/>
                        </div>
                    </div>   
                    <p id="company"> {selectedCompany.company} </p>
                    <p id="jobsite"> {selectedCompany.jobsite} </p>
                    <div className='rows-sidebar'>
                    {selectedCompany.code ? (
                        <>
                            {inventory.map((row) => {
                        if (row[0] == selectedCompany.code) {
                            return ( 
                            <div>
                                 <div className='row-sidebar' style={{display: !showCero && row[3] == 0? "none":"flex"}}> 
                                    <p id="element-title"> 6’h X 4’w Aluminum Frames </p>
                                    <p> {row[3]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[4] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 5’h X 4’w Aluminum Frames </p>
                                    <p> {row[4]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[5] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 4’h X 4’w Aluminum Frames </p>
                                    <p> {row[5]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[6] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 2’h X 4’w Aluminum Frames </p>
                                    <p> {row[6]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[7] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 6’h X 4’w Steel Frames </p>
                                    <p> {row[7]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[8] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 5’h X 4’w Steel Frames </p>
                                    <p> {row[8]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[9] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 4’h X 4’w Steel Frames </p>
                                    <p> {row[9]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[10] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 3’h X 4’w Steel Frames </p>
                                    <p> {row[10]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[11] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 10 x 4 Cross Bars </p>
                                    <p> {row[11]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[12] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 10 x 2 Cross Bars </p>
                                    <p> {row[12]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[13] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 7 x 4 Cross Bars </p>
                                    <p> {row[13]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[14] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 7 x 2 Cross Bars </p>
                                    <p> {row[14]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[15] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 5 x 4 Cross Bars </p>
                                    <p> {row[15]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[16] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 5 x 2 Cross Bars </p>
                                    <p> {row[16]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[17] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 4 x 4 Cross Bars </p>
                                    <p> {row[17]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[18] == 0? "none":"flex"}}>  
                                    <p id="element-title"> 4 x 2 Cross Bars </p>
                                    <p> {row[18]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[19] == 0? "none":"flex"}}>  
                                    <p id="element-title"> S.J Aluminum U/Heads </p>
                                    <p> {row[19]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[20] == 0? "none":"flex"}}>  
                                    <p id="element-title"> S.J Aluminum B/Plates </p>
                                    <p> {row[20]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[21] == 0? "none":"flex"}}>  
                                    <p id="element-title"> S.J Steel U/Heads </p>
                                    <p> {row[21]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[22] == 0? "none":"flex"}}>  
                                    <p id="element-title"> S.J Steel B/Plates </p>
                                    <p> {row[22]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[23] == 0? "none":"flex"}}>  
                                    <p id="element-title"> Alum.Frame Coup Pins</p>
                                    <p> {row[23]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[24] == 0? "none":"flex"}}>  
                                    <p id="element-title"> Steel Frame Coup Pins </p>
                                    <p> {row[24]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[25] == 0? "none":"flex"}}>  
                                    <p id="element-title"> Beam Clips </p>
                                    <p> {row[25]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[31] == 0? "none":"flex"}}>  
                                    <p id="element-title">  20' Alum Beams </p>
                                    <p> {row[31]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[32] == 0? "none":"flex"}}>  
                                    <p id="element-title">  18' Alum Beams </p>
                                    <p> {row[32]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[33] == 0? "none":"flex"}}>  
                                    <p id="element-title">  16' Alum Beams </p>
                                    <p> {row[33]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[34] == 0? "none":"flex"}}>  
                                    <p id="element-title">  14' Alum Beams </p>
                                    <p> {row[34]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[35] == 0? "none":"flex"}}>  
                                    <p id="element-title">  13' Alum Beams </p>
                                    <p> {row[35]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[36] == 0? "none":"flex"}}>  
                                    <p id="element-title">  12' Alum Beams </p>
                                    <p> {row[36]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[38] == 0? "none":"flex"}}>  
                                    <p id="element-title">  11' Alum Beams </p>
                                    <p> {row[38]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[37] == 0? "none":"flex"}}>  
                                    <p id="element-title">  10'6" Alum Beams </p>
                                    <p> {row[37]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[39] == 0? "none":"flex"}}>  
                                    <p id="element-title">  10' Alum Beams </p>
                                    <p> {row[39]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[40] == 0? "none":"flex"}}>  
                                    <p id="element-title">  9' Alum Beams </p>
                                    <p> {row[40]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[41] == 0? "none":"flex"}}>  
                                    <p id="element-title">  8' Alum Beams </p>
                                    <p> {row[41]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[42] == 0? "none":"flex"}}>  
                                    <p id="element-title">  7' Alum Beams </p>
                                    <p> {row[42]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[43] == 0? "none":"flex"}}>  
                                    <p id="element-title">  6' Alum Beams </p>
                                    <p> {row[43]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[44] == 0? "none":"flex"}}>  
                                    <p id="element-title">  5' Alum Beams </p>
                                    <p> {row[44]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[45] == 0? "none":"flex"}}>  
                                    <p id="element-title">  4' Alum Beams </p>
                                    <p> {row[45]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[27] == 0? "none":"flex"}}>  
                                    <p id="element-title"> Post Shore No.1 </p>
                                    <p> {row[27]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[28] == 0? "none":"flex"}}>  
                                    <p id="element-title"> Post Shore No.2 </p>
                                    <p> {row[28]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[29] == 0? "none":"flex"}}>  
                                    <p id="element-title"> Post Shore No.3 </p>
                                    <p> {row[29]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[30] == 0? "none":"flex"}}>  
                                    <p id="element-title"> Post Shore No.4 </p>
                                    <p> {row[30]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[47] == 0? "none":"flex"}}>  
                                    <p id="element-title">  12" 4 x 6 Wood Beams </p>
                                    <p> {row[47]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[48] == 0? "none":"flex"}}>  
                                    <p id="element-title">  11" 4 x 6 Wood Beams </p>
                                    <p> {row[48]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[49] == 0? "none":"flex"}}>  
                                    <p id="element-title">  10" 4 x 6 Wood Beams </p>
                                    <p> {row[49]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[50] == 0? "none":"flex"}}>  
                                    <p id="element-title">  9" 4 x 6 Wood Beams </p>
                                    <p> {row[50]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[51] == 0? "none":"flex"}}>  
                                    <p id="element-title">  8" 4 x 6 Wood Beams </p>
                                    <p> {row[51]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[52] == 0? "none":"flex"}}>  
                                    <p id="element-title">  7" 4 x 6 Wood Beams </p>
                                    <p> {row[52]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[53] == 0? "none":"flex"}}>  
                                    <p id="element-title">  6" 4 x 6 Wood Beams </p>
                                    <p> {row[53]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[54] == 0? "none":"flex"}}>  
                                    <p id="element-title">  5" 4 x 6 Wood Beams </p>
                                    <p> {row[54]}</p>
                                </div>
                                <div className='row-sidebar' style={{display: !showCero && row[55] == 0? "none":"flex"}}>  
                                    <p id="element-title">  4" 4 x 6 Wood Beams </p>
                                    <p> {row[55]}</p>
                                </div>    
                            </div> 
                            )
                        }
                        return null
                            })}
                        </>
                    ) : (
                      <p className='emptyArray'>Nothing Selected</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inventory
