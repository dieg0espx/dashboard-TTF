import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';

function Order() {
    const [order, setOrder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [codeToUpdate, setCodeToUpdate] = useState("");
    const [nameToUpdate, setNameToUpdate] = useState("");
    const [valueToUpdate, setValueToUpdate] = useState("");
    const [selectedID, setSelectedID] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
  
    const inputRef = useRef(null);
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    
    useEffect(() => {
        fetchData();
        window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            inputRef.current?.focus();
        }
    }, [showPopup]);


    function getID() {
        let location = window.location.toString();
        return location.split('=')[1];
    }

    function fetchData() {
        fetch(apiURL + '/getOrderByID.php?id=' + getID())
            .then(response => response.json())
            .then(response => setOrder(response))
            .catch(error => console.error('Error fetching order:', error));
    }

    function formatDate(dateString) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const [year, month, day] = dateString.split('-');
        const monthIndex = parseInt(month) - 1;
        return `${months[monthIndex]} ${parseInt(day)}, ${year}`;
    }

    function showUpdatePopup(name, value, code) {
        setShowPopup(true);
        setNameToUpdate(name);
        setValueToUpdate(value);
        setCodeToUpdate(code);
    }

    function capitalizeString(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function updateElement(id, value, code) {
        await fetch(`${apiURL}/updateOrder.php?id=${getID()}&&code=${code}&&value=${value}`);
        fetchData();
        setNameToUpdate('');
        setValueToUpdate('');
        setCodeToUpdate('');
        setShowPopup(false);
        inputRef.current.value = '';
    }


    if (!order) return <div>Loading...</div>;

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
                    <div className='row' onClick={() => showUpdatePopup("added", elements.added, 'added')}>
                      <h4> Added via: </h4>
                      <p> {elements.added}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("ret", elements.ret, 'ret')}>
                      <h4> Returned via: </h4>
                      <p> {elements.ret}</p>
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
                    <div className='row' onClick={() => showUpdatePopup("2’h X 4’w Aluminum Frames", elements.af2x4, 'af2x4')}>
                      <h4> 2’h X 4’w Aluminum Frames: </h4>
                      <p> {elements.af2x4}</p>
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
                    <div className='row' onClick={() => showUpdatePopup("S.J Aluminum U/Heads 40\"", elements.auh40, 'auh40')}>
                      <h4> S.J Aluminum U/Heads 40": </h4>
                      <p> {elements.auh40}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Aluminum Regular Heads", elements.auhreg, 'auhreg')}>
                      <h4> Aluminum Regular Heads: </h4>
                      <p> {elements.auhreg}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Aluminum B/Plates", elements.abp, 'abp')}>
                      <h4> S.J Aluminum B/Plates: </h4>
                      <p> {elements.abp}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Aluminum B/Plates 40\"", elements.abp40, 'abp40')}>
                      <h4> S.J Aluminum B/Plates 40": </h4>
                      <p> {elements.abp40}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Aluminum Regular Plates", elements.abp, 'abpreg')}>
                      <h4> Aluminum Regular Plates: </h4>
                      <p> {elements.abp40}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel U/Heads", elements.suh, 'suh')}>
                      <h4> S.J Steel U/Heads: </h4>
                      <p> {elements.suh}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel U/Heads 36\"", elements.suh, 'suh36')}>
                      <h4> S.J Steel U/Heads 36": </h4>
                      <p> {elements.suh36}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel U/Heads 40\"", elements.suh, 'suh40')}>
                      <h4> S.J Steel U/Heads 40": </h4>
                      <p> {elements.suh40}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Steel Regular Heads", elements.abp, 'suhreg')}>
                      <h4> Steel Regular Heads: </h4>
                      <p> {elements.suhreg}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel B/Plates", elements.sbp, 'sbp')}>
                      <h4>S.J Steel B/Plates: </h4>
                      <p> {elements.sbp}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel B/Plates 36\"", elements.sbp, 'sbp36')}>
                      <h4>S.J Steel B/Plates 36": </h4>
                      <p> {elements.sbp36}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("S.J Steel B/Plates 40\"", elements.sbp, 'sbp40')}>
                      <h4>S.J Steel B/Plates 40": </h4>
                      <p> {elements.sbp40}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("Steel Regular Plates", elements.sbp, 'sbpreg')}>
                      <h4>Steel Regular Plates: </h4>
                      <p> {elements.sbpreg}</p>
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
                    <div className='row' onClick={() => showUpdatePopup("NO.O Shores 3' - 4'6\" (GREEN)", elements.sh03, 'sh0')}>
                      <h4>No.O Shores 3' - 4'6" (GREEN) </h4>
                      <p> {elements.sh03}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. O SHORES 4' - 6'6\" (SILVER)", elements.sh04, 'sh04')}>
                      <h4> NO. O SHORES 4' - 6'6" (SILVER): </h4>
                      <p> {elements.sh04}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. O SHORES 3'9 - 6' (GREEN)", elements.sh039, 'sh039')}>
                      <h4> NO. O SHORES 3'9 - 6' (GREEN): </h4>
                      <p> {elements.sh039}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. 1 SHORES ", elements.sh1, 'sh1')}>
                      <h4> "No. 1 SHORES: </h4>
                      <p> {elements.sh1}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. 1 SHORES (BLUE) ", elements.sh1b, 'sh1b')}>
                      <h4> NO. 1 SHORES (BLUE): </h4>
                      <p> {elements.sh1b}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. 2 SHORES ", elements.sh2, 'sh2')}>
                      <h4> NO. 2 SHORES: </h4>
                      <p> {elements.sh2}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. 3 SHORES ", elements.sh3, 'sh3')}>
                      <h4> NO. 3 SHORES: </h4>
                      <p> {elements.sh3}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. 3 SHORES (BLUE) ", elements.sh3, 'sh3b')}>
                      <h4> NO. 3 SHORES (BLUE): </h4>
                      <p> {elements.sh3b}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. 4 SHORES ", elements.sh4, 'sh4')}>
                      <h4> NO. 4 SHORES: </h4>
                      <p> {elements.sh4}</p>
                    </div>
                    <div className='row' onClick={() => showUpdatePopup("NO. 4 SHORES (BLUE) ", elements.sh4, 'sh4b')}>
                      <h4> NO. 4 SHORES (BLUE): </h4>
                      <p> {elements.sh4b}</p>
                    </div>

                    <h5> Wood Beams </h5>
                    <div className='row' onClick={() => showUpdatePopup("14\" 4x6 Wood Beams", elements.wb14, 'wb14')}>
                      <h4> 14" 4x6 Wood Beams: </h4>
                      <p> {elements.wb14}</p>
                    </div>
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
                    <div className='row' onClick={() => showUpdatePopup("Steel Cage 4x4x4x", elements.sc4x4x4, 'sc4x4x4')}>
                      <h4> Steel Cage 4x4x4: </h4>
                      <p> {elements.sc4x4x4}</p>
                    </div>
                    <div className='row'>
                      <h4 onClick={() => showUpdatePopup(elements.extraA, elements.extraA, 'extraA')}> {elements.extraA} </h4>
                      <p onClick={() => showUpdatePopup(elements.extraA, elements.extra1, 'extra1')}> {elements.extra1}</p>
                    </div>
                    <div className='row'>
                      <h4 onClick={() => showUpdatePopup(elements.extraB, elements.extraB, 'extraB')}> {elements.extraB} </h4>
                      <p onClick={() => showUpdatePopup(elements.extraB, elements.extra2, 'extra2')}> {elements.extra2}</p>
                    </div>
                    <div className='row'>
                      <h4 onClick={() => showUpdatePopup(elements.extraC, elements.extraC, 'extraC')}> {elements.extraC} </h4>
                      <p onClick={() => showUpdatePopup(elements.extraC, elements.extra3, 'extra3')}> {elements.extra3}</p>
                    </div>
                    <div className='row'>
                      <h4 onClick={() => showUpdatePopup(elements.extraD, elements.extraD, 'extraD')}> {elements.extraD} </h4>
                      <p onClick={() => showUpdatePopup(elements.extraD, elements.extra4, 'extra4')}> {elements.extra4}</p>
                    </div>
                    <div className='row'>
                      <h4 onClick={() => showUpdatePopup(elements.extraE, elements.extraE, 'extraE')}> {elements.extraE} </h4>
                      <p onClick={() => showUpdatePopup(elements.extraE, elements.extra5, 'extra5')}> {elements.extra5}</p>
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
            {/* <input type={codeToUpdte == 'date' ? "date":"text"} placeholder={valueToUpdate} ref={inputRef} onChange={(e)=>setValueToUpdate(e.target.value)}></input> */}
            <input type={codeToUpdate === 'date' ? "date" : "text"} placeholder={valueToUpdate} ref={inputRef} onChange={(e) => setValueToUpdate(e.target.value)}></input>
          </div>
          <button onClick={() => updateElement(selectedID, valueToUpdate, codeToUpdate)}> Update </button>
        </div>
    </div>
  )
}

export default Order
