import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

function Inventory() {

    const [inventory, setInventory] = useState([])
    const [finding, setFinding] = useState('')
    const [selectedCompany, setSelectedCompany] = useState([])


    useEffect(()=>{
        getInventory()
    },[])

    async function getInventory() {
        fetch('https://script.google.com/macros/s/AKfycbw9W1Ctu9286GWSJf6Db2HyNY7gKzbjVLE3QvAompXgf8Gk3K902DiUIvH9nWSx9_v0zQ/exec')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // Assuming response is an array
            // const resultsToProcess = response.slice(1); // Skip the first result
            setInventory(response);
        });
    }

    function onCompanySelected(code, company, jobsite){
        let array = {code, company, jobsite}
        setSelectedCompany(array)
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
                    <i className="bi bi-layout-sidebar-inset-reverse sidebarIcon"></i>
                </div>
            </div>
            <div className='main-grid'>
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
                <div className='sideBar'>
                    <p id="code"> {selectedCompany.code} </p>
                    <p id="company"> {selectedCompany.company} </p>
                    <p id="jobsite"> {selectedCompany.jobsite} </p>
                    <div className='rows-sidebar'>
                    {inventory.map((row) => {
                        if (row[0] == selectedCompany.code) {
                            return ( 
                            <div>
                                 <div className='row-sidebar'> 
                                    <p id="element-title"> 6’h X 4’w Aluminum Frames </p>
                                    <p> {row[3]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 5’h X 4’w Aluminum Frames </p>
                                    <p> {row[4]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 4’h X 4’w Aluminum Frames </p>
                                    <p> {row[5]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 6’h X 4’w Steel Frames </p>
                                    <p> {row[6]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 5’h X 4’w Steel Frames </p>
                                    <p> {row[7]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 4’h X 4’w Steel Frames </p>
                                    <p> {row[8]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 3’h X 4’w Steel Frames </p>
                                    <p> {row[9]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 10 x 4 Cross Bars </p>
                                    <p> {row[10]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 10 x 2 Cross Bars </p>
                                    <p> {row[11]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 7 x 4 Cross Bars </p>
                                    <p> {row[12]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 7 x 2 Cross Bars </p>
                                    <p> {row[13]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 5 x 4 Cross Bars </p>
                                    <p> {row[14]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 5 x 2 Cross Bars </p>
                                    <p> {row[15]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 4 x 4 Cross Bars </p>
                                    <p> {row[16]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> 4 x 2 Cross Bars </p>
                                    <p> {row[17]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> S.J Aluminum U/Heads </p>
                                    <p> {row[18]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> S.J Aluminum B/Plates </p>
                                    <p> {row[19]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> S.J Steel U/Heads </p>
                                    <p> {row[20]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> S.J Steel B/Plates </p>
                                    <p> {row[21]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Alum.Frame Coup Pins</p>
                                    <p> {row[22]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Steel Frame Coup Pins </p>
                                    <p> {row[23]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Beam Clips </p>
                                    <p> {row[24]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  20' Alum Beams </p>
                                    <p> {row[25]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  18' Alum Beams </p>
                                    <p> {row[26]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  16' Alum Beams </p>
                                    <p> {row[27]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  14' Alum Beams </p>
                                    <p> {row[28]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  13' Alum Beams </p>
                                    <p> {row[29]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  12' Alum Beams </p>
                                    <p> {row[30]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  11' Alum Beams </p>
                                    <p> {row[31]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  10'6" Alum Beams </p>
                                    <p> {row[32]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  10' Alum Beams </p>
                                    <p> {row[33]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  9' Alum Beams </p>
                                    <p> {row[34]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  8' Alum Beams </p>
                                    <p> {row[35]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  7' Alum Beams </p>
                                    <p> {row[36]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  6' Alum Beams </p>
                                    <p> {row[37]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  5' Alum Beams </p>
                                    <p> {row[38]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  4' Alum Beams </p>
                                    <p> {row[39]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Post Shore No.1 </p>
                                    <p> {row[40]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Post Shore No.2 </p>
                                    <p> {row[41]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Post Shore No.3 </p>
                                    <p> {row[42]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Post Shore No.4 </p>
                                    <p> {row[43]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  12" 4 x 6 Wood Beams </p>
                                    <p> {row[44]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  11" 4 x 6 Wood Beams </p>
                                    <p> {row[45]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  10" 4 x 6 Wood Beams </p>
                                    <p> {row[46]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  9" 4 x 6 Wood Beams </p>
                                    <p> {row[47]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  8" 4 x 6 Wood Beams </p>
                                    <p> {row[48]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  7" 4 x 6 Wood Beams </p>
                                    <p> {row[49]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  6" 4 x 6 Wood Beams </p>
                                    <p> {row[50]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  5" 4 x 6 Wood Beams </p>
                                    <p> {row[51]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title">  4" 4 x 6 Wood Beams </p>
                                    <p> {row[52]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Alum Frame 6x4 </p>
                                    <p> {row[53]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Alum Frame 6x4 </p>
                                    <p> {row[54]}</p>
                                </div>
                                <div className='row-sidebar'> 
                                    <p id="element-title"> Alum Frame 6x4 </p>
                                    <p> {row[55]}</p>
                                </div>                
                            </div> 
                            )
                        }
                        return null
                    })}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inventory
