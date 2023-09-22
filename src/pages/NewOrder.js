import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import FormNewJobsite from '../components/FormNewJobsite'
import Switch from "react-switch";


function NewOrder() {
    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const [showNewAutocomplete, setShowNewAutocomplete] = useState(false)
    const [jobsites, setJobsites] = useState([])
    const [finding, setFinding] = useState('')
    const [randomNumber, setRandomNumber] = useState('');
    const [load, setLoad] = useState(0)

    const [company, setCompany] = useState('')
    const [jobsite, setJobsite] = useState('')
    const [contact, setContact] = useState('')
    const [tel, setTel] = useState('')
    const [date, setDate] = useState()

    const[af6x4, setAf6x4] = useState(0);
    const[af5x4, setAf5x4] = useState(0);
    const[af4x4, setAf4x4] = useState(0);
    const[sf6x4, setSf6x4] = useState(0);
    const[sf5x4, setSf5x4] = useState(0);
    const[sf4x4, setSf4x4] = useState(0);
    const[sf3x4, setSf3x4] = useState(0);

    const[cb10x4, setCb10x4] = useState(0);
    const[cb10x2, setCb10x2] = useState(0);
    const[cb7x4, setCb7x4] = useState(0);
    const[cb7x2, setCb7x2] = useState(0);
    const[cb5x4, setCb5x4] = useState(0);
    const[cb5x2, setCb5x2] = useState(0);
    const[cb4x4, setCb4x4] = useState(0);
    const[cb4x2, setCb4x2] = useState(0);

    const [afc, setAfc] = useState(0)
    const [sfc, setSfc] = useState(0)
    const [bc, setBc] = useState(0)

    const [auh, setAuh] = useState(0)
    const [abp, setAbp] = useState(0)
    const [suh, setSuh] = useState(0)
    const [sbp, setSbp] = useState(0)


    const [ab20, setAb20] = useState(0)
    const [ab18, setAb18] = useState(0)
    const [ab16, setAb16] = useState(0)
    const [ab14, setAb14] = useState(0)
    const [ab13, setAb13] = useState(0)
    const [ab12, setAb12] = useState(0)
    const [ab11, setAb11] = useState(0)
    const [ab106, setAb106] = useState(0)
    const [ab10, setAb10] = useState(0)
    const [ab9, setAb9] = useState(0)
    const [ab8, setAb8] = useState(0)
    const [ab7, setAb7] = useState(0)
    const [ab6, setAb6] = useState(0)
    const [ab5, setAb5] = useState(0)
    const [ab4, setAb4] = useState(0)

    const [sh1, setSh1] = useState(0)
    const [sh2, setSh2] = useState(0)
    const [sh3, setSh3] = useState(0)
    const [sh4, setSh4] = useState(0)

    const [wb12, setWb12] = useState(0)
    const [wb11, setWb11] = useState(0)
    const [wb10, setWb10] = useState(0)
    const [wb9, setWb9] = useState(0)
    const [wb8, setWb8] = useState(0)
    const [wb7, setWb7] = useState(0)
    const [wb6, setWb6] = useState(0)
    const [wb5, setWb5] = useState(0)
    const [wb4, setWb4] = useState(0)

    const [extraA, setExtraA] = useState('')
    const [extraB, setExtraB] = useState('')
    const [extraC, setExtraC] = useState('')
    const [extraD, setExtraD] = useState('')
    const [extraE, setExtraE] = useState('')

    const [extra1, setExtra1] = useState(0)
    const [extra2, setExtra2] = useState(0)
    const [extra3, setExtra3] = useState(0)
    const [extra4, setExtra4] = useState(0)
    const [extra5, setExtra5] = useState(0)

    const [drawings, setDrawings] = useState(false)

    useEffect(()=>{
      fetch('https://api.ttfconstruction.com/getJobsites.php')
      .then(response => response.json())
      .then(response => {
          const sortedJobsites = response.sort((a, b) => a.companyName.localeCompare(b.companyName));
          setJobsites(sortedJobsites);
        });
  },[])



  function saveNewOrder(){
    const data = {company, jobsite, contact, tel, date, af6x4, af5x4, af4x4, sf6x4, sf5x4, sf4x4, sf3x4, cb10x4, cb10x2, cb7x4, cb7x2, cb5x4, cb5x2, cb4x4, cb4x2, afc, sfc, bc, auh, abp, suh, sbp, ab20, ab18, ab16, ab14, ab13, ab12, ab11, ab106, ab10, ab9, ab8, ab7, ab6, ab5, ab4, sh1, sh2, sh3, sh4, wb12, wb11, wb10, wb9, wb8, wb7, wb6, wb5, wb4, extraA, extraB, extraC, extraD, extraE, extra1, extra2, extra3, extra4, extra5, drawings: drawings?"true":"false", done:''};

    const jsonString = JSON.stringify(data);
  
    fetch('https://api.ttfconstruction.com/newOrder.php?data=' + jsonString)
    .then(response => response.json())
    .then(response => console.log(response))
    alert("New Order added successfully !")
    window.location.href = '/orders';
}

function autoCompleteSelected(company, jobsite, contact, tel) {
    setCompany(company);
    setJobsite(jobsite);
    setContact(contact);
    setTel(tel);
}

function openNewJobsite(){
  setShowNewAutocomplete(true)
  setLoad(load+1)
}

  return (
    <div className='wrapper-newOrder'>
      <div>
        <Sidebar />
      </div>
      <div className='content' >
        <div className='header'>
          <h1> New Order </h1>
          <div className='actions'>
            <i className="bi bi-view-list autocompleteIcon" onClick={()=>setShowAutocomplete(true)}></i>
          </div>
        </div>
        <div className='form-newOrder'>
          <h2> Contact Information </h2>
          <div className='field'>
            <p> Company Name </p>
            <input className='upperCase' type='text' onChange={(e)=>setCompany(e.target.value)} value={company} placeholder='Company name'/> 
          </div>
          <div className='field'>
            <p> Jobsite </p>
            <input className='upperCase' type='text' onChange={(e)=>setJobsite(e.target.value)} value={jobsite} placeholder='Address'/> 
          </div>
          <div className='field'>
            <p> Contact </p>
            <input className='upperCase' type='text' onChange={(e)=>setContact(e.target.value)} value={contact} placeholder='Contact'/> 
          </div>
          <div className='field'>
            <p> Tel </p>
            <input className='upperCase' type='tel'  onChange={(e)=>setTel(e.target.value)} value={tel} placeholder='Phone Number'/> 
          </div>
          <div className='field'>
            <p> Due Date </p>
            <input className='upperCase' type='date' onChange={(e)=>setDate(e.target.value)} /> 
          </div>

          <h2> Frames </h2>
          <div className='field'>
            <p> 6’H X 4’W ALUM H.D. FRAMES </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAf6x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 5’H X 4’W ALUM H.D. FRAMES </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAf5x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 4’H X 4’W ALUM H.D. FRAMES </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAf4x4(e.target.value)} /> 
          </div>
          <div className='field'>
            <p> 6’H X 4’W STEEL H.D. FRAMES </p>
            <input type='tel'placeholder='0' onChange={(e)=>setSf6x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 5’H X 4’W STEEL H.D. FRAMES </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSf5x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 4’H X 4’W STEEL H.D. FRAMES </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSf4x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 3’H X 4’W STEEL H.D. FRAMES </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSf3x4(e.target.value)}/> 
          </div>

          <h2> Cross Bars </h2>
          <div className='field'>
            <p> 10 X 4 CROSS BARS (PURPLE)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb10x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 10 X 2 CROSS BARS (PINK) </p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb10x2(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	7 X 4 CROSS BARS (YELLOW)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb7x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 7 X 2 CROSS BARS (RED)	</p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb7x2(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	5 X 4 CROSS BARS (GREEN)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb5x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	5 X 2 CROSS BARS (ORANGE)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb5x2(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	4 X 4 CROSS BARS (BLUE)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb4x4(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	4 X 2 CROSS BARS (WHITE)		 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setCb4x2(e.target.value)}/> 
          </div>

          <h2> Screw Jacks </h2>
          <div className='field'>
            <p>	ALUM H.D S.J U/HEAD	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAuh(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	ALUM H.D S.J B/PLATE	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAbp(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	STEEL H.D S.J U/HEAD	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSuh(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	STEEL H.D S.J B/PLATE	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSbp(e.target.value)}/> 
          </div>

          <h2> Pins & Clips </h2>
          <div className='field'>
            <p>	ALUM H.D. FRAME COUP PINS	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAfc(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	STEEL H.D. FRAME COUP PINS		 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSfc(e.target.value)}/> 
          </div>
          <div className='field'>
            <p>	BEAM CLIPS-REG	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setBc(e.target.value)}/> 
          </div>


          <h2> Aluminumn Beams </h2>
          <div className='field'>
            <p>	20'0" ALUM.BEAMS (PURPLE)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb20(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 18'0" ALUM.BEAMS (RED) </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb18(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 16'0" ALUM.BEAMS (YELLOW)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb16(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 14'0" ALUM.BEAMS (SILVER)	</p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb14(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 13'0" ALUM.BEAMS (PINK)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb13(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 12'0" ALUM.BEAMS (BROWN)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb12(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 11'0" ALUM.BEAMS (BROWN)	</p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb11(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 10.6'0" ALUM.BEAMS (BLUE)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb106(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 10'0" ALUM.BEAMS (BLACK)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb10(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 9'0" ALUM.BEAMS (ORANGE)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb9(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 8'0" ALUM.BEAMS (RED)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb8(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 7'0" ALUM.BEAMS (YELLOW)	</p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb7(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 6'0" ALUM.BEAMS (GREEN)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb6(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 5'0" ALUM.BEAMS (WHITE)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb5(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 4'0" ALUM.BEAMS (LIME GREEN)	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setAb4(e.target.value)}/> 
          </div>
 
          <h2> Post Shores </h2>
          <div className='field'>
            <p> No.1 Shore	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSh1(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> No.2 Shore	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSh2(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> No.3 Shore	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSh3(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> No.4 Shore	 </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSh4(e.target.value)}/> 
          </div>

          <h2> Wood Beams </h2>
          <div className='field'>
            <p> 12'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setSh1(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 11'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb11(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 10'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb10(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 9'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb9(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 8'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb8(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 7'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb7(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 6'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb6(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 5'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb5(e.target.value)}/> 
          </div>
          <div className='field'>
            <p> 4'0" 4X6 WOOD BEAMS </p>
            <input type='tel' placeholder='0' onChange={(e)=>setWb4(e.target.value)}/> 
          </div>

          <h2> Others </h2>
          <div className='field'>
            <input className='extras' type='text' placeholder='Extra A' onChange={(e)=>setExtraA(e.target.value)}/>
            <input type='tel' placeholder='0' onChange={(e)=>setExtra1(e.target.value)}/> 
          </div>
          <div className='field'>
            <input className='extras' type='text' placeholder='Extra B' onChange={(e)=>setExtraB(e.target.value)}/>
            <input type='tel' placeholder='0' onChange={(e)=>setExtra2(e.target.value)}/> 
          </div>
          <div className='field'>
            <input className='extras' type='text' placeholder='Extra C' onChange={(e)=>setExtraC(e.target.value)}/>
            <input type='tel' placeholder='0' onChange={(e)=>setExtra3(e.target.value)}/> 
          </div>
          <div className='field'>
            <input className='extras' type='text' placeholder='Extra D' onChange={(e)=>setExtraD(e.target.value)}/>
            <input type='tel' placeholder='0' onChange={(e)=>setExtra4(e.target.value)}/> 
          </div>
          <div className='field'>
            <input className='extras' type='text' placeholder='Extra E' onChange={(e)=>setExtraE(e.target.value)}/>
            <input type='tel' placeholder='0' onChange={(e)=>setExtra5(e.target.value)}/> 
          </div>
       
       

          <div className='grid-drawings'>
            <Switch onChange={()=>setDrawings(!drawings)} checked={drawings} uncheckedIcon={false} checkedIcon={false} onColor='#65D1B5'/>
            <p> Include Drawings </p>
          </div>
         
          


          <button onClick={()=>saveNewOrder()}> Save Order </button>
        </div>
      </div>
      <div className='overlay' style={{display: showAutocomplete? "block":"none"}} onClick={()=>setShowAutocomplete(false)}></div>
      <div className='wrapper-autocompletes' style={{display: showAutocomplete? "block":"none"}}>
        <div className='wrapper-autocomplete' style={{display: showAutocomplete && !showNewAutocomplete? "block":"none"}}>
        <div className='header'>
            <h2> Auto Complete</h2>
            <i className="bi bi-plus-lg plusIcon" onClick={()=> openNewJobsite()}></i>
        </div>
        <div className='searchBar'>
            <input type='text' placeholder='What are you looking for?' onChange={(e)=> setFinding(e.target.value)}></input>
        </div>
        <div className='jobsites-autoComplete'>
            {jobsites.map(jobsite => {
                if (jobsite.companyName.includes(finding) || jobsite.jobsite.includes(finding)) {
                    return (
                      <div key={jobsite.id} className='row-autoComplete' onClick={()=>autoCompleteSelected(jobsite.companyName, jobsite.jobsite, jobsite.contact, jobsite.tel)}>
                        <p id="company">{jobsite.companyName}</p>
                        <p>{jobsite.jobsite}</p>
                      </div>
                    );
                } 
            })}
        </div>
        </div>
       
        <div className='wrapper-newAutocomplete' style={{display: showNewAutocomplete? "block":"none"}} >
            <div className='header'>
              <i className="bi bi-chevron-left backIcon" onClick={()=> setShowNewAutocomplete(false)}></i>
              <h2> New Jobsite</h2>
            </div>
            <FormNewJobsite load={load} />
        </div>

      </div>
    </div>
  )
}

export default NewOrder
