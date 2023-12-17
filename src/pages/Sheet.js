import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import '../Sheet.css'

function Sheet() {

  const [elements, setElements] = useState([])
  const [totalWeight, setTotalWeight] = useState(0)
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  useEffect(()=>{
      const searchParams = new URLSearchParams(window.location.search);
      fetch( apiURL + '/getOrderByID.php?id=' + getID() )
      .then(response => response.json())
      .then(response => setElements(response[0]))

      fetch( apiURL + '/getWeight.php?id=' + getID() )
      .then(response => response.json())
      .then(response => setTotalWeight(response))

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
            <p> {elements.added == 0? "" : elements.added}</p>
        </div>
        <div id="thirdRow">
            <h2> CONTACT NAME: </h2>
            <p> {elements.contact}</p>
            <h2> TEL:</h2>
            <p> {elements.tel} </p>
            <h2> RETURNED VIA:</h2>
            <p> {elements.ret == 0? "" : elements.ret}</p>
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
             <td className='description'> NO. 0 SHORES 3' - 4'6" (GREEN) </td>
             <td> {elements.sh03 > 0 ? elements.sh03 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 5’H X 4’W ALUM H.D. FRAMES </td>
             <td> {elements.af5x4 > 0 ? elements.af5x4 : ""} </td>
             <td></td>
             <td className='description'> NO. 0 SHORES 4' - 6'6" (SILVER)</td>
             <td> {elements.sh04 > 0 ? elements.sh04 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 4’H X 4’W ALUM H.D. FRAMES </td>
             <td> {elements.af4x4 > 0 ? elements.af4x4 : ""} </td>
             <td></td>
             <td className='description'> NO. 0 SHORES 3'9" - 6' (GREEN) </td>
             <td> {elements.sh039 > 0 ? elements.sh039 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 2'H X 4'W ALUM FRAMES (EXT)</td>
             <td> {elements.af2x4 > 0 ? elements.af2x4 : ""} </td>
             <td></td>
             <td className='description'> NO. 1 SHORES </td>
             <td> {elements.sh1 > 0 ? elements.sh1 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> NO. 1 SHORES (BLUE) </td>
             <td> {elements.sh1b > 0 ? elements.sh1b : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 6'H X 4' STEEL H.D. FRAMES </td>
             <td> {elements.sf6x4 > 0 ? elements.sf6x4 : ""} </td>
             <td></td>
             <td className='description'> NO. 2 SHORES  </td>
             <td> {elements.sh2 > 0 ? elements.sh2 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 5’H X 4’W STEEL H.D. FRAMES </td>
             <td> {elements.sf5x4 > 0 ? elements.sf5x4 : ""} </td>
             <td></td>
             <td className='description'>  NO. 3 SHORES </td>
             <td> {elements.sh3 > 0 ? elements.sh3 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> <i className="bi bi-square"></i> 4’H X 4’W STEEL H.D. FRAMES </td>
             <td> {elements.sf4x4 > 0 ? elements.sf4x4 : ""} </td>
             <td></td>
             <td className='description'> NO. 3 SHORES (BLUE) </td>
             <td> {elements.sh3b > 0 ? elements.sh3b : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> <i className="bi bi-square"></i> 3’H X 4’W STEEL H.D. FRAMES </td>
             <td> {elements.sf3x4 > 0 ? elements.sf3x4 : ""} </td>
             <td></td>
             <td className='description'> NO. 4 SHORES </td>
             <td> {elements.sh4 > 0 ? elements.sh4 : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> NO. 4 SHORES (BLUE) </td>
             <td> {elements.sh4b > 0 ? elements.sh4b : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> 10 X 4 C.BARS (PURPLE)</td>
             <td>{elements.cb10x4 > 0 ? elements.cb10x4 : ""} </td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> 10 X 2 C.BARS (PINK) </td>
             <td> {elements.cb10x2 > 0 ? elements.cb10x2 : ""} </td>
             <td></td>
             <td className='description'> 20'0" ALUM BEAMS (PURPLE) </td>
             <td> {elements.ab20 > 0 ? elements.ab20 : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> 7 X 4 C.BARS (YELLOW) </td>
             <td> {elements.cb7x4 > 0 ? elements.cb7x4 : ""} </td>
             <td></td>
             <td className='description'> 18'0" ALUM BEAMS (RED) </td>
             <td> {elements.ab18 > 0 ? elements.ab18 : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> 7 X 2 C.BARS (RED) </td>
             <td> {elements.cb7x2 > 0 ? elements.cb7x2 : ""} </td>
             <td></td>
             <td className='description'> 16'0" ALUM BEAMS (YELLOW) </td>
             <td> {elements.ab16 > 0 ? elements.ab16 : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> 5 X 4 C.BARS (GREEN) </td>
             <td> {elements.cb5x4 > 0 ? elements.cb5x4 : ""} </td>
             <td></td>
             <td className='description'> 14'0" ALUM BEAMS (SILVER) </td>
             <td> {elements.ab14 > 0 ? elements.ab14 : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> 5 X 2 C.BARS (ORANGE) </td>
             <td> {elements.cb5x2 > 0 ? elements.cb5x2 : ""} </td>
             <td></td>
             <td className='description'> 13'0" ALUM BEAMS (PINK) </td>
             <td> {elements.ab13 > 0 ? elements.ab13 : ""} </td>
             <td></td>
          </tr>
           <tr>
             <td className='description'> 4 X 4 C.BARS (BLUE) </td>
             <td> {elements.cb4x4 > 0 ? elements.cb4x4 : ""} </td>
             <td></td>
             <td className='description'> 12'0" ALUM BEAMS (BROWN) </td>
             <td> {elements.ab12 > 0 ? elements.ab12 : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> 4 X 2 C.BARS (WHITE) </td>
             <td> {elements.cb4x2 > 0 ? elements.cb4x2 : ""} </td>
             <td></td>
             <td className='description'> 11'0" ALUM BEAMS (GREEN) </td>
             <td> {elements.ab11 > 0 ? elements.ab11 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 10'6" ALUM BEAMS (BLUE)</td>
             <td> {elements.ab106 > 0 ? elements.ab106 : ""}</td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> ALUM H.D S.J U/HEADS </td>
             <td> {elements.auh > 0 ? elements.auh : ""} </td>
             <td></td>
             <td className='description'> 10'0" ALUM BEAMS (BLACK) </td>
             <td> {elements.ab10 > 0 ? elements.ab10 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> ALUM H.D. S.J. U/HEADS 40" </td>
             <td> {elements.auh40 > 0 ? elements.auh40 : ""} </td>
             <td></td>
             <td className='description'> 9'0" ALUM BEAMS (ORANGE) </td>
             <td> {elements.ab9 > 0 ? elements.ab9 : ""} </td>
             <td></td>
          </tr>
           <tr>
            <td className='description'> ALUM REGULAR HEADS </td>
             <td> {elements.auhreg > 0 ? elements.auhreg : ""} </td>
             <td></td>
             <td className='description'> 8'0" ALUM BEAMS (RED) </td>
             <td> {elements.ab8 > 0 ? elements.ab8 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> ALUM H.D. S.J. B/PLATES  </td>
             <td> {elements.abp > 0 ? elements.abp : ""} </td>
             <td></td>
             <td className='description'> 7'0" ALUM BEAMS (YELLOW) </td>
             <td> {elements.ab7 > 0 ? elements.ab7 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> ALUM H.D. S.J. B/PLATES 40"  </td>
             <td> {elements.abp40 > 0 ? elements.abp40 : ""} </td>
             <td></td>
             <td className='description'> 6'0" ALUM BEAMS (GREEN) </td>
             <td> {elements.ab6 > 0 ? elements.ab6 : ""} </td>
             <td></td>
            </tr>
           <tr>
             <td className='description'> ALUM REGULAR PLATES </td>
             <td> {elements.abpreg > 0 ? elements.abpreg : ""} </td>
             <td></td>
             <td className='description'> 5'0" ALUM BEAMS (WHITE) </td>
             <td> {elements.ab5 > 0 ? elements.ab5 : ""} </td>
             <td></td>
          </tr>
           <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 4'0" ALUM BEAMS (LIME GREEN) </td>
             <td> {elements.ab4 > 0 ? elements.ab4 : ""} </td>
             <td></td>
          </tr>
           <tr>
             <td className='description'> STEEL H.D. S.J. U/HEADS </td>
             <td> {elements.suh > 0 ? elements.suh : ""} </td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
           </tr>
           <tr>
             <td className='description'> STEEL H.D. S.J. U/HEADS 36" </td>
             <td> {elements.suh36 > 0 ? elements.suh36 : ""} </td>
             <td></td>
             <td className='description'> 14'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb14 > 0 ? elements.wb14 : ""} </td>
             <td></td>
            </tr>
          <tr>
             <td className='description'> STEEL H.D. S.J. U/HEADS 40"  </td>
             <td> {elements.suh40 > 0 ? elements.suh40 : ""} </td>
             <td></td>
             <td className='description'> 12'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb12 > 0 ? elements.wb12 : ""} </td>
             <td></td>
          </tr>
           
          <tr>
             <td className='description'> STEEL REGULAR HEADS </td>
             <td> {elements.suhreg > 0 ? elements.suhreg : ""} </td>
             <td></td>
             <td className='description'> 11'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb11 > 0 ? elements.wb11 : ""} </td>
             <td></td>
          </tr>

          <tr>
             <td className='description'> STEEL H.D. S.J. B/PLATES </td>
             <td> {elements.sbp > 0 ? elements.sbp : ""} </td>
             <td></td>
             <td className='description'> 10'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb10 > 0 ? elements.wb10 : ""} </td>
             <td></td>
          </tr>

          <tr>
             <td className='description'> STEEL H.D. S.J. B/PLATES 36"  </td>
             <td> {elements.sbp36 > 0 ? elements.sbp36 : ""} </td>
             <td></td>
             <td className='description'> 9'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb9 > 0 ? elements.wb9 : ""} </td>
             <td></td>
          </tr>

          <tr>
             <td className='description'> STEEL H.D. S.J. B/PLATES 40"  </td>
             <td> {elements.sbp40 > 0 ? elements.sbp40 : ""} </td>
             <td></td>
             <td className='description'> 8'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb8 > 0 ? elements.wb8 : ""} </td>
             <td></td>
          </tr>

          <tr>
             <td className='description'> STEEL REGULAR PLATES  </td>
             <td> {elements.sbpreg > 0 ? elements.sbpreg : ""} </td>
             <td></td>
             <td className='description'> 7'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb7 > 0 ? elements.wb7 : ""} </td>
             <td></td>
          </tr>

          <tr>
             <td></td>
             <td></td>
             <td></td>
             <td className='description'> 6'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb6 > 0 ? elements.wb6 : ""} </td>
             <td></td>
          </tr>

          <tr>
             <td className='description'> ALUM H.D. FRAME COUPLING PINS </td>
             <td> {elements.afc > 0 ? elements.afc : ""} </td>
             <td></td>
             <td className='description'> 5'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb5 > 0 ? elements.wb5 : ""} </td>
             <td></td>
          </tr>

          <tr>
             <td className='description'> STEEL H.D. FRAME COUPLING PINS </td>
             <td> {elements.sfc > 0 ? elements.sfc : ""} </td>
             <td></td>
             <td className='description'> 4'0" 4X6 WOOD BEAMS </td>
             <td> {elements.wb4 > 0 ? elements.wb4 : ""} </td>
             <td></td>
          </tr>
          <tr>
             <td className='description'> BEAM CLIPS-REG    </td>
             <td> {elements.bc > 0 ? elements.bc : ""} </td>
             <td></td>
             <td className='description'> 4' X4' X 4' STEEL CAGE </td>
             <td> {elements.sc4x4x4 > 0 ? elements.sc4x4x4 : ""} </td>
             <td></td>
          </tr>
          <tr style={{display: elements.extra1 > 0 ? "":"none"}}> 
           <td className='description'> {elements.extraA}  </td>
           <td>  {elements.extra1 > 0 ? elements.extra1 : ""} </td>
           <td></td>
           <td className='description'> {elements.extraB}  </td>
           <td>  {elements.extra2 > 0 ? elements.extra2 : ""} </td>
           <td></td>
          </tr>
          <tr style={{display: elements.extra3 > 0 ? "":"none"}}> 
           <td className='description'> {elements.extraC}  </td>
           <td>  {elements.extra3 > 0 ? elements.extra3 : ""} </td>
           <td></td>
           <td className='description'> {elements.extraD}  </td>
           <td>  {elements.extra4 > 0 ? elements.extra4 : ""} </td>
           <td></td>
          </tr>
          <tr style={{display: elements.extra5 > 0 ? "":"none"}}> 
           <td className='description'> {elements.extraE}  </td>
           <td>  {elements.extra5 > 0 ? elements.extra5 : ""} </td>
           <td></td>
           <td className='description'> </td>
           <td> </td>
           <td></td>
          </tr>
          </tbody>
        </table>
        <p id="totWeight"><b>Total Weight:</b> {totalWeight} lbs</p>
      </div>
    </div>
  )
  
}

export default Sheet
