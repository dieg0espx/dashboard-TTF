import React, { useEffect, useState, useRef} from 'react'
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';


function Order() {
    const [order, setOrder] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [codeToUpdte, setCodeToUpdate] = useState("");
    const [nameToUpdate, setNameToUpdate] = useState("")
    const [valueToUpdate, setValueToUpdate] = useState("");
    const [selectedID, setSelectedID] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
  
    const inputRef = useRef(null);
    
    useEffect(()=>{
     fetchData()
     window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false)
    },[])

    useEffect(()=>{
      if(!isMobile){
        inputRef.current.focus();
      }      
    },[showPopup])

    function getID(){
      let location = window.location.toString()
      return location.split('=')[1]
    }

    function fetchData(){
      fetch('https://api.ttfconstruction.com/getOrderByID.php?id=' +  getID())
      .then(response => response.json())
      .then(response => setOrder(response))
    }

    function formatDate(date, daysToAdd = 0) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + daysToAdd);      
      let formattedDate = newDate.toLocaleString("en-US", {
          dateStyle: "long",
      });
      return formattedDate;
    }

    function showUpdatePopup(name, value, code){
      setShowPopup(true)
      setNameToUpdate(name)
      setValueToUpdate(value)
      setCodeToUpdate(code)
    }

    function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function updateElement(id, value, code){
      await fetch(`https://api.ttfconstruction.com/updateOrder.php?id=` + getID() + '&&code=' + code + '&&value=' + value)
      fetchData()
      setNameToUpdate('')
      setValueToUpdate('')
      setCodeToUpdate('')
      setShowPopup(false)
      inputRef.current.value = '';
    };

  return (
    <div className='wrapper-order'>
        <Sidebar />
        <div className='content'>
            {order.map((elements) => (   
                <div key={elements}> 
                    <div className='header'>
                        <div>
                          <h2> {elements.company} </h2>
                          <h3> {elements.jobsite} </h3>
                        </div>
                        <div>
                          <p className='includeDrawings' style={{display: elements.drawings == 'true'? "block":"none"}}>Include Drawings</p>
                        </div>
                    </div>

                    <div className='row' onClick={() => showUpdatePopup("company", elements.company, 'company')}>
                      <h4> Company: </h4>
                      <p> {elements.company}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("jobsite", elements.jobsite, 'jobsite')}>
                      <h4> Jobsite: </h4>
                      <p> {elements.jobsite}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("date", elements.date, 'date')}>
                      <h4> Date: </h4>
                      <p> {formatDate(elements.date)}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("contact", elements.contact, 'contact')}>
                      <h4> Contact Name: </h4>
                      <p> {elements.contact}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("tel", elements.tel, 'tel')}>
                      <h4> Tel: </h4>
                      <p> {elements.tel}</p>
                    </div>

                    <h5> Frames </h5>
                    <div className='row' onClick={() => showUpdatePopup("6’h X 4’w Aluminum Frames", elements.af6x4, 'af6x4')}>
                      <h4> 6’h X 4’w Aluminum Frames: </h4>
                      <p> {elements.af6x4}</p>
                    </div>

                    <div className='row' onClick={() => showUpdatePopup("5’h X 4’w Aluminum Frames", elements.af5x4, 'af5x4')}>
                      <h4> 5’h X 4’w Aluminum Frames: </h4>
                      <p> {elements.af5x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("4’h X 4’w Aluminum Frames", elements.af4x4, 'af4x4')}>
                      <h4> 4’h X 4’w Aluminum Frames: </h4>
                      <p> {elements.af4x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("6’h X 4’w Steel Frames", elements.sf6x4, 'sf6x4')}>
                      <h4> 6’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf6x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("5’h X 4’w Steel Frames", elements.sf5x4, 'sf5x4')}>
                      <h4> 5’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf5x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("4’h X 4’w Steel Frames", elements.sf4x4, 'sf4x4')}>
                      <h4> 4’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf4x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("3’h X 4’w Steel Frames", elements.sf3x4, 'sf3x4')}>
                      <h4> 3’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf3x4}</p>
                    </div>

                    <h5> Cross Bars </h5>
                    <div className='row' onClick={() => showUpdatePopup("10 x 4 Cross Bars", elements.cb10x4, 'cb10x4')}>
                      <h4> 10 x 4 Cross Bars: </h4>
                      <p> {elements.cb10x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("10 x 2 Cross Bars", elements.cb10x2, 'cb10x2')}>
                      <h4> 10 x 2 Cross Bars: </h4>
                      <p> {elements.cb10x2}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("7 x 4 Cross Bars", elements.cb7x4, 'cb7x4')}>
                      <h4> 7 x 4 Cross Bars: </h4>
                      <p> {elements.cb7x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("7 x 2 Cross Bars", elements.cb7x2, 'cb7x2')}>
                      <h4> 7 x 2 Cross Bars: </h4>
                      <p> {elements.cb7x2}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("5 x 4 Cross Bars", elements.cb5x4, 'cb5x4')}>
                      <h4> 5 x 4 Cross Bars: </h4>
                      <p> {elements.cb5x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("5 x 2 Cross Bars", elements.cb5x2, 'cb5x2')}>
                      <h4> 5 x 2 Cross Bars: </h4>
                      <p> {elements.cb5x2}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("4 x 4 Cross Bars", elements.cb4x4, 'cb4x4')}>
                      <h4> 4 x 4 Cross Bars: </h4>
                      <p> {elements.cb4x4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("4 x 2 Cross Bars", elements.cb4x2, 'cb4x2')}>
                      <h4> 4 x 2 Cross Bars: </h4>
                      <p> {elements.cb4x2}</p>
                    </div>

                    <h5> Screw Jacks </h5>
                    <div className='row' onClick={() => showUpdatePopup("S.J Aluminum U/Heads", elements.auh, 'auh')}>
                      <h4> S.J Aluminum U/Heads: </h4>
                      <p> {elements.auh}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Aluminum B/Plates", elements.abp, 'abp')}>
                      <h4> S.J Aluminum B/Plates: </h4>
                      <p> {elements.abp}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel U/Heads", elements.suh, 'suh')}>
                      <h4> S.J Steel U/Heads: </h4>
                      <p> {elements.suh}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel B/Plates", elements.sbp, 'sbp')}>
                      <h4>S.J Steel B/Plates: </h4>
                      <p> {elements.sbp}</p>
                    </div>

                    <h5> Pins & Clips </h5>
                    <div className='row' onClick={() => showUpdatePopup("Alum.Frame Coup Pins", elements.afc, 'afc')}>
                      <h4>Alum.Frame Coup Pins: </h4>
                      <p> {elements.afc}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Steel Frame Coup Pins", elements.sfc, 'sfc')}>
                      <h4>Steel Frame Coup Pins: </h4>
                      <p> {elements.sfc}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Beam Clips", elements.bc, 'bc')}>
                      <h4>Beam Clips: </h4>
                      <p> {elements.bc}</p>
                    </div>

                    <h5> Aluminum Beams </h5>
                    <div className='row' onClick={() => showUpdatePopup("20' Alum.Beams", elements.ab20, 'ab20')}>
                      <h4> 20' Alum.Beams: </h4>
                      <p> {elements.ab20}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("18' Alum.Beams", elements.ab18, 'ab18')}>
                      <h4> 18' Alum.Beams: </h4>
                      <p> {elements.ab18}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("16' Alum.Beams", elements.ab16, 'ab16')}>
                      <h4> 16' Alum.Beams: </h4>
                      <p> {elements.ab16}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("14' Alum.Beams", elements.ab14, 'ab14')}>
                      <h4> 14' Alum.Beams: </h4>
                      <p> {elements.ab14}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("13' Alum.Beams", elements.ab13, 'ab13')}>
                      <h4> 13' Alum.Beams: </h4>
                      <p> {elements.ab13}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("12' Alum.Beams", elements.ab12, 'ab12')}>
                      <h4> 12' Alum.Beams: </h4>
                      <p> {elements.ab12}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("11' Alum.Beams", elements.ab11, 'ab11')}>
                      <h4> 11' Alum.Beams: </h4>
                      <p> {elements.ab11}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("10'6\" Alum.Beams", elements.ab106, 'ab106')}>
                      <h4> 10'6" Alum.Beams: </h4>
                      <p> {elements.ab106}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("10' Alum.Beams", elements.ab10, 'ab10')}>
                      <h4> 10' Alum.Beams: </h4>
                      <p> {elements.ab10}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("9' Alum.Beams", elements.ab9, 'ab9')}>
                      <h4> 9' Alum.Beams: </h4>
                      <p> {elements.ab9}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("8' Alum.Beams", elements.ab8, 'ab8')}>
                      <h4> 8' Alum.Beams: </h4>
                      <p> {elements.ab8}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("7' Alum.Beams", elements.ab7, 'ab7')}>
                      <h4> 7' Alum.Beams: </h4>
                      <p> {elements.ab7}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("6' Alum.Beams", elements.ab6, 'ab6')}>
                      <h4> 6' Alum.Beams: </h4>
                      <p> {elements.ab6}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("5' Alum.Beams", elements.ab5, 'ab5')}>
                      <h4> 5' Alum.Beams: </h4>
                      <p> {elements.ab5}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("4' Alum.Beams", elements.ab4, 'ab4')}>
                      <h4> 4' Alum.Beams: </h4>
                      <p> {elements.ab4}</p>
                    </div>

                    <h5> Post Shores </h5>
                    <div className='row' onClick={() => showUpdatePopup("Post Shores No.1", elements.sh1, 'sh1')}>
                      <h4> Post Shores No.1: </h4>
                      <p> {elements.sh1}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Post Shores No.2", elements.sh2, 'sh2')}>
                      <h4> Post Shores No.2: </h4>
                      <p> {elements.sh2}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Post Shores No.3", elements.sh3, 'sh3')}>
                      <h4> Post Shores No.3: </h4>
                      <p> {elements.sh3}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Post Shores No.4", elements.sh4, 'sh4')}>
                      <h4> Post Shores No.4: </h4>
                      <p> {elements.sh4}</p>
                    </div>

                    <h5> Wood Beams </h5>
                    <div className='row' onClick={() => showUpdatePopup("12\" 4x6 Wood Beams", elements.wb12, 'wb12')}>
                      <h4> 12" 4x6 Wood Beams: </h4>
                      <p> {elements.wb12}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("11\" 4x6 Wood Beams", elements.wb11, 'wb11')}>
                      <h4> 11" 4x6 Wood Beams: </h4>
                      <p> {elements.wb11}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("10\" 4x6 Wood Beams", elements.wb10, 'wb10')}>
                      <h4> 10" 4x6 Wood Beams: </h4>
                      <p> {elements.wb10}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("9\" 4x6 Wood Beams", elements.wb9, 'wb9')}>
                      <h4> 9" 4x6 Wood Beams: </h4>
                      <p> {elements.wb9}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("8\" 4x6 Wood Beams", elements.wb8, 'wb8')}>
                      <h4> 8" 4x6 Wood Beams: </h4>
                      <p> {elements.wb8}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("7\" 4x6 Wood Beams", elements.wb7, 'wb7')}>
                      <h4> 7" 4x6 Wood Beams: </h4>
                      <p> {elements.wb7}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("6\" 4x6 Wood Beams", elements.wb6, 'wb6')}>
                      <h4> 6" 4x6 Wood Beams: </h4>
                      <p> {elements.wb6}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("5\" 4x6 Wood Beams", elements.wb5, 'wb5')}>
                      <h4> 5" 4x6 Wood Beams: </h4>
                      <p> {elements.wb5}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("4\" 4x6 Wood Beams", elements.wb4, 'wb4')}>
                      <h4> 4" 4x6 Wood Beams: </h4>
                      <p> {elements.wb4}</p>
                    </div>

                    <h5> Others</h5>
                    <div className='row' onClick={() => showUpdatePopup(elements.extraA, elements.extra1, 'extra1')}>
                      <h4> {elements.extraA} </h4>
                      <p> {elements.extra1}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup(elements.extraB, elements.extra2, 'extra2')}>
                      <h4> {elements.extraB} </h4>
                      <p> {elements.extra2}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup(elements.extraC, elements.extra3, 'extra3')}>
                      <h4> {elements.extraC} </h4>
                      <p> {elements.extra3}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup(elements.extraD, elements.extra4, 'extra4')}>
                      <h4> {elements.extraD} </h4>
                      <p> {elements.extra4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup(elements.extraE, elements.extra5, 'extra5')}>
                      <h4> {elements.extraE} </h4>
                      <p> {elements.extra5}</p>
                    </div>
                </div>
            ))}
        </div>
        
          <div className="overlay-update-element" style={{display: showPopup ? "block":"none"}} onClick={()=>setShowPopup(false)}></div>
          <div className="update-element" style={{display: showPopup ? "block":"none"}} >
          <h2> Update </h2>
          <p id="legend"> Enter the new value to update</p>
          <div className='details-element'>
            <p><b> {capitalizeString(nameToUpdate)} </b></p>
            <input type={codeToUpdte == 'date' ? "date":"text"} placeholder={valueToUpdate} ref={inputRef} onChange={(e)=>setValueToUpdate(e.target.value)}></input>
          </div>
          <button onClick={()=> updateElement(selectedID, valueToUpdate, codeToUpdte)}> Update </button>
        </div>
    </div>
  )
}

export default Order
