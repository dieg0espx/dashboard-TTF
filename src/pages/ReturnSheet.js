import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import logo from '../images/logo.png'
import '../Sheet.css'


function ReturnSheet() {
  const [elements, setElements] = useState([])
  const location = useLocation();
 
  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const dataParam = queryParams.get('data');
  
    if (dataParam) {
      try {
        const data = JSON.parse(dataParam);
        setElements(data)
        setTimeout(window.print,1000)
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      }
    }    
  },[])



function upperCase(str){
    return str.toUpperCase();
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
            <p> {upperCase(elements.company)}</p>
            <h2> DATE:</h2>
            <p> {elements.date}</p>
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
             <td></td>
             <td> {elements.af6x4 > 0 ? elements.af6x4 : ""} </td>
             
             <td className='description'> 20’ 0” ALUM.BEAMS (PURPLE)</td>
             <td></td>
             <td> {elements.ab20 > 0 ? elements.ab20 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 5’H X 4’W ALUM H.D. FRAMES </td>
             <td></td>
             <td> {elements.af5x4 > 0 ? elements.af5x4 : ""} </td>
             
             <td className='description'> 18’ 0” ALUM.BEAMS (RED)</td>
             <td></td>
             <td> {elements.ab18 > 0 ? elements.ab18 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 4’H X 4’W ALUM H.D. FRAMES </td>
             <td></td>
             <td> {elements.af4x4 > 0 ? elements.af4x4 : ""} </td>
             
             <td className='description'> 16’ 0” ALUM.BEAMS (YELLOW) </td>
             <td></td>
             <td> {elements.ab16 > 0 ? elements.ab16 : ""} </td>
             
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 14’ 0” ALUM.BEAMS (SILVER)</td>
             <td></td>
             <td> {elements.ab14 > 0 ? elements.ab14 : ""}</td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 6’H X 4’W STEEL H.D. FRAMES </td>
             <td></td>
             <td> {elements.sf6x4 > 0 ? elements.sf6x4 : ""} </td>
             
             <td className='description'> 13’ 0” ALUM.BEAMS (PINK) </td>
             <td></td>
             <td> {elements.ab13 > 0 ? elements.ab13 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 5’H X 4’W STEEL H.D. FRAMES </td>
             <td></td>
             <td> {elements.sf5x4 > 0 ? elements.sf5x4 : ""} </td>
             
             <td className='description'> 12’ 0” ALUM.BEAMS (BROWN)  </td>
             <td></td>
             <td> {elements.ab12 > 0 ? elements.ab12 : ""} </td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 4’H X 4’W STEEL H.D. FRAMES </td>
             <td></td>
             <td> {elements.sf4x4 > 0 ? elements.sf4x4 : ""} </td>
             
             <td className='description'> 11’ 0” ALUM.BEAMS (GREEN) </td>
             <td></td>
             <td> {elements.ab11 > 0 ? elements.ab11 : ""} </td>

            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 3’H X 4’W STEEL H.D. FRAMES </td>
             <td></td>
             <td> {elements.sf3x4 > 0 ? elements.sf3x4 : ""} </td>
             
             <td className='description'> 10.6’ 0” ALUM.BEAMS (BLUE) </td>
             <td></td>
             <td> {elements.ab106 > 0 ? elements.ab106 : ""} </td>
             
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 10.0’ 0” ALUM.BEAMS (BLACK) </td>
             <td></td>
             <td> {elements.ab10 > 0 ? elements.ab10 : ""} </td>
             
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 9’ 0” ALUM.BEAMS (ORANGE)</td>
             <td></td>
             <td>{elements.ab9 > 0 ? elements.ab9 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> 10 X 4 C.BARS (PURPLE) </td>
             <td></td>
             <td> {elements.cb10x4 > 0 ? elements.cb10x4 : ""} </td>
             
             <td className='description'> 8’ 0” ALUM.BEAMS (RED)</td>
             <td></td>
             <td> {elements.ab8 > 0 ? elements.ab8 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> 10 X 2 C.BARS (PINK) </td>
             <td></td>
             <td> {elements.cb10x2 > 0 ? elements.cb10x2 : ""} </td>
             
             <td className='description'> 7’ 0” ALUM.BEAMS (YELLOW) </td>
             <td></td>
             <td> {elements.ab7 > 0 ? elements.ab7 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> 7 X 4 C.BARS (YELLOW) </td>
             <td></td>
             <td> {elements.cb7x4 > 0 ? elements.cb7x4 : ""} </td>
             
             <td className='description'> 6’ 0” ALUM.BEAMS (GREEN) </td>
             <td></td>
             <td> {elements.ab6 > 0 ? elements.ab6 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> 7 X 2 C.BARS (RED) </td>
             <td></td>
             <td> {elements.cb7x2 > 0 ? elements.cb7x2 : ""} </td>
             
             <td className='description'> 5’ 0” ALUM.BEAMS (WHITE) </td>
             <td></td>
             <td> {elements.ab5 > 0 ? elements.ab5 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> 5 X 4 C.BARS (GREEN) </td>
             <td></td>
             <td> {elements.cb5x4 > 0 ? elements.cb5x4 : ""} </td>
             
             <td className='description'> 4’ 0” ALUM.BEAMS (LIME) </td>
             <td></td>
             <td> {elements.ab4 > 0 ? elements.ab4 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> 5 X 2 C.BARS (ORANGE) </td>
             <td></td>
             <td> {elements.cb5x2 > 0 ? elements.cb5x2 : ""} </td>
             
             <td className='description'> </td>
             <td>  </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> 4 X 4 C.BARS (BLUE) </td>
             <td></td>
             <td> {elements.cb4x4 > 0 ? elements.cb4x4 : ""} </td>
             
             <td className='description'> NO.1 SHORES </td>
             <td></td>
             <td> {elements.sh1 > 0 ? elements.sh1 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> 4 X 2 C.BARS (WHITE) </td>
             <td></td>
             <td> {elements.cb4x2 > 0 ? elements.cb4x2 : ""} </td>
             
             <td className='description'> NO.2 SHORES</td>
             <td></td>
             <td> {elements.sh2 > 0 ? elements.sh2 : ""} </td>
             
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> NO.3 SHORES</td>
             <td></td>
             <td> {elements.sh3 > 0 ? elements.sh3 : ""}</td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> ALUM H.D S.J U/HEADS </td>
             <td></td>
             <td> {elements.auh > 0 ? elements.auh : ""} </td>
             
             <td className='description'> NO.4 SHORES</td>
             <td></td>
             <td> {elements.sh4 > 0 ? elements.sh4 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> ALUM H.D S.J B/PLATES </td>
             <td></td>
             <td> {elements.abp > 0 ? elements.abp : ""} </td>
             
             <td className='description'> </td>
             <td>  </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'>  </td>
             <td>  </td>
             <td></td>
             <td className='description'> 12'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb12 > 0 ? elements.wb12 : ""} </td>
            
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> STEEL H.D S.J U/HEADS  </td>
             <td></td>
             <td> {elements.suh > 0 ? elements.suh : ""} </td>
             
             <td className='description'> 11'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb11 > 0 ? elements.wb11 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> STEEL H.D S.J B/PLATES  </td>
             <td></td>
             <td> {elements.sbp > 0 ? elements.sbp : ""} </td>
             
             <td className='description'> 10'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb10 > 0 ? elements.wb10 : ""} </td>
             
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 9'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb9 > 0 ? elements.wb9 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> ALUM H.D. FRAME COUP PINS </td>
             <td></td>
             <td> {elements.afc > 0 ? elements.afc : ""} </td>
             
             <td className='description'> 8'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb8 > 0 ? elements.wb8 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> STEEL H.D. FRAME COUP PINS  </td>
             <td></td>
             <td> {elements.sfc > 0 ? elements.sfc : ""} </td>
             
             <td className='description'> 7'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb7 > 0 ? elements.wb7 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> </td>
             <td>  </td>
             <td></td>
             <td className='description'> 6'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb6 > 0 ? elements.wb6 : ""} </td>
            
            </tr>
           <tr>
             <td className='description'> BEAM CLIPS-REG  </td>
             <td></td>
             <td> {elements.bc > 0 ? elements.bc : ""} </td>
             
             <td className='description'> 5'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb5 > 0 ? elements.wb5 : ""} </td>
             
            </tr>
           <tr>
             <td className='description'> DRAWINGS  </td>
             <td></td>
             <td> {elements.drawings === 'false' ? "" : <i className="bi bi-check2-circle"></i>} </td>
             
             <td className='description'> 4'0" 4X6 WOOD BEAMS </td>
             <td></td>
             <td> {elements.wb4 > 0 ? elements.wb4 : ""} </td>
             
            </tr>

            <tr style={{display: elements.extra1 > 0 ? "":"none"}}> 
             <td className='description'> {elements.extraA}  </td>
             <td></td>
             <td>  {elements.extra1 > 0 ? elements.extra1 : ""} </td>
             
             <td className='description'> {elements.extraB}  </td>
             <td></td>
             <td>  {elements.extra2 > 0 ? elements.extra2 : ""} </td>
             
            </tr>
            <tr style={{display: elements.extra3 > 0 ? "":"none"}}> 
             <td className='description'> {elements.extraC}  </td>
             <td></td>
             <td>  {elements.extra3 > 0 ? elements.extra3 : ""} </td>
             
             <td className='description'> {elements.extraD}  </td>
             <td></td>
             <td>  {elements.extra4 > 0 ? elements.extra4 : ""} </td>
             
            </tr>
            <tr style={{display: elements.extra5 > 0 ? "":"none"}}> 
             <td className='description'> {elements.extraE}  </td>
             <td></td>
             <td>  {elements.extra5 > 0 ? elements.extra5 : ""} </td>
             
             <td className='description'> </td>
             <td></td>
             <td></td>
            </tr>
          
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

export default ReturnSheet
