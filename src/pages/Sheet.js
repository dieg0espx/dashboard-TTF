import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import '../Sheet.css'

function Sheet() {

  const [elements, setElements] = useState([])
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  useEffect(()=>{
      const searchParams = new URLSearchParams(window.location.search);
      fetch( apiURL + '/getOrderByID.php?id=' + getID() )
      .then(response => response.json())
      .then(response => setElements(response[0]))
      setTimeout(window.print,1000)
  },[])

  function getID(){
    let location = window.location.toString()
    return location.split('=')[1]
  }


  function formatDate(date){
    const dateObj = new Date(date);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  }


  return (
    <div className='wrapper-sheet'>
      <div id="header">
        <img src={logo}></img>
        <div>
            <p> 10979 Olsen Road </p>
            <p> Surrey, BC </p>
            <p> V3V 3S9 </p>
            <p> Tel:(778) 898-5301 </p>
            <p> info@ttfscaffolding.com </p>
        </div>
      </div>
      <div id="contact-info">
        <div id="firstRow">
            <h2> CUSTOMER NAME: </h2>
            <p> {elements.company}</p>
            <h2> DATE:</h2>
            <p> {formatDate(elements.date)}</p>
        </div>
        <div id="seccondRow">
            <h2> JOBSITE: </h2>
            <p> {elements.jobsite}</p>
            <h2> ADDED VIA:</h2>
            <p></p>
        </div>
        <div id="thirdRow">
            <h2> CONTACT NAME: </h2>
            <p> {elements.contact}</p>
            <h2> TEL:</h2>
            <p> {elements.tel} </p>
            <h2> RETURNED VIA:</h2>
            <p> </p>
        </div>
      </div>
      <div className='content'>
        <table>
          <thead>
            <tr>
              <th> DESCRIPTION </th>
              <th> ADD </th>
              <th> RET </th>
              <th> DESCRIPTION </th>
              <th> ADD </th>
              <th> RET </th>
            </tr>
          </thead>
          <tbody>
          <tr>
             <td className='description'> <i className="bi bi-square"></i> 6’H X 4’W ALUM H.D. FRAMES </td>
             <td> {elements.af6x4 > 0 ? elements.af6x4 : ""} </td>
             <td></td>
             <td className='description'> 20’ 0” ALUM.BEAMS (PURPLE)</td>
             <td> {elements.ab20 > 0 ? elements.ab20 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 5’H X 4’W ALUM H.D. FRAMES </td>
             <td> {elements.af5x4 > 0 ? elements.af5x4 : ""} </td>
             <td></td>
             <td className='description'> 18’ 0” ALUM.BEAMS (RED)</td>
             <td> {elements.ab18 > 0 ? elements.ab18 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 4’H X 4’W ALUM H.D. FRAMES </td>
             <td> {elements.af4x4 > 0 ? elements.af4x4 : ""} </td>
             <td></td>
             <td className='description'> 16’ 0” ALUM.BEAMS (YELLOW) </td>
             <td> {elements.ab16 > 0 ? elements.ab16 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 14’ 0” ALUM.BEAMS (SILVER)</td>
             <td> {elements.ab14 > 0 ? elements.ab14 : ""}</td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 6’H X 4’W STEEL H.D. FRAMES </td>
             <td> {elements.sf6x4 > 0 ? elements.sf6x4 : ""} </td>
             <td></td>
             <td className='description'> 13’ 0” ALUM.BEAMS (PINK) </td>
             <td> {elements.ab13 > 0 ? elements.ab13 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 5’H X 4’W STEEL H.D. FRAMES </td>
             <td> {elements.sf5x4 > 0 ? elements.sf5x4 : ""} </td>
             <td></td>
             <td className='description'> 12’ 0” ALUM.BEAMS (BROWN)  </td>
             <td> {elements.ab12 > 0 ? elements.ab12 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 4’H X 4’W STEEL H.D. FRAMES </td>
             <td> {elements.sf4x4 > 0 ? elements.sf4x4 : ""} </td>
             <td></td>
             <td className='description'> 11’ 0” ALUM.BEAMS (GREEN) </td>
             <td> {elements.ab11 > 0 ? elements.ab11 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 3’H X 4’W STEEL H.D. FRAMES </td>
             <td> {elements.sf3x4 > 0 ? elements.sf3x4 : ""} </td>
             <td></td>
             <td className='description'> 10.6’ 0” ALUM.BEAMS (BLUE) </td>
             <td> {elements.ab106 > 0 ? elements.ab106 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 10.0’ 0” ALUM.BEAMS (BLACK) </td>
             <td> {elements.ab10 > 0 ? elements.ab10 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 9’ 0” ALUM.BEAMS (ORANGE)</td>
             <td>{elements.ab9 > 0 ? elements.ab9 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 10 X 4 C.BARS (PURPLE) </td>
             <td> {elements.cb10x4 > 0 ? elements.cb10x4 : ""} </td>
             <td></td>
             <td className='description'> 8’ 0” ALUM.BEAMS (RED)</td>
             <td> {elements.ab8 > 0 ? elements.ab8 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 10 X 2 C.BARS (PINK) </td>
             <td> {elements.cb10x2 > 0 ? elements.cb10x2 : ""} </td>
             <td></td>
             <td className='description'> 7’ 0” ALUM.BEAMS (YELLOW) </td>
             <td> {elements.ab7 > 0 ? elements.ab7 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 7 X 4 C.BARS (YELLOW) </td>
             <td> {elements.cb7x4 > 0 ? elements.cb7x4 : ""} </td>
             <td></td>
             <td className='description'> 6’ 0” ALUM.BEAMS (GREEN) </td>
             <td> {elements.ab6 > 0 ? elements.ab6 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 7 X 2 C.BARS (RED) </td>
             <td> {elements.cb7x2 > 0 ? elements.cb7x2 : ""} </td>
             <td></td>
             <td className='description'> 5’ 0” ALUM.BEAMS (WHITE) </td>
             <td> {elements.ab5 > 0 ? elements.ab5 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 5 X 4 C.BARS (GREEN) </td>
             <td> {elements.cb5x4 > 0 ? elements.cb5x4 : ""} </td>
             <td></td>
             <td className='description'> 4’ 0” ALUM.BEAMS (LIME) </td>
             <td> {elements.ab4 > 0 ? elements.ab4 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 5 X 2 C.BARS (ORANGE) </td>
             <td> {elements.cb5x2 > 0 ? elements.cb5x2 : ""} </td>
             <td></td>
             <td className='description'> </td>
             <td>  </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 4 X 4 C.BARS (BLUE) </td>
             <td> {elements.cb4x4 > 0 ? elements.cb4x4 : ""} </td>
             <td></td>
             <td className='description'> NO.1 SHORES </td>
             <td> {elements.sh1 > 0 ? elements.sh1 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 4 X 2 C.BARS (WHITE) </td>
             <td> {elements.cb4x2 > 0 ? elements.cb4x2 : ""} </td>
             <td></td>
             <td className='description'> NO.2 SHORES</td>
             <td> {elements.sh2 > 0 ? elements.sh2 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> NO.3 SHORES</td>
             <td> {elements.sh3 > 0 ? elements.sh3 : ""}</td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> ALUM H.D S.J U/HEADS </td>
             <td> {elements.auh > 0 ? elements.auh : ""} </td>
             <td></td>
             <td className='description'> NO.4 SHORES</td>
             <td> {elements.sh4 > 0 ? elements.sh4 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> ALUM H.D S.J B/PLATES </td>
             <td> {elements.abp > 0 ? elements.abp : ""} </td>
             <td></td>
             <td className='description'> </td>
             <td>  </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'>  </td>
             <td>  </td>
             <td></td>
             <td className='description'> 12'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb12 > 0 ? elements.wb12 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> STEEL H.D S.J U/HEADS  </td>
             <td> {elements.suh > 0 ? elements.suh : ""} </td>
             <td></td>
             <td className='description'> 11'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb11 > 0 ? elements.wb11 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> STEEL H.D S.J B/PLATES  </td>
             <td> {elements.sbp > 0 ? elements.sbp : ""} </td>
             <td></td>
             <td className='description'> 10'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb10 > 0 ? elements.wb10 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 9'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb9 > 0 ? elements.wb9 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> ALUM H.D. FRAME COUP PINS </td>
             <td> {elements.afc > 0 ? elements.afc : ""} </td>
             <td></td>
             <td className='description'> 8'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb8 > 0 ? elements.wb8 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> STEEL H.D. FRAME COUP PINS  </td>
             <td> {elements.sfc > 0 ? elements.sfc : ""} </td>
             <td></td>
             <td className='description'> 7'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb7 > 0 ? elements.wb7 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> </td>
             <td>  </td>
             <td></td>
             <td className='description'> 6'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb6 > 0 ? elements.wb6 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> BEAM CLIPS-REG  </td>
             <td> {elements.bc > 0 ? elements.bc : ""} </td>
             <td></td>
             <td className='description'> 5'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb5 > 0 ? elements.wb5 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> DRAWINGS  </td>
             <td> {elements.drawings === 'false' ? "" : <i className="bi bi-check2-circle"></i>} </td>
             <td></td>
             <td className='description'> 4'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb4 > 0 ? elements.wb4 : ""} </td>
             <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

export default Sheet
