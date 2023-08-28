import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

function Trucks() {

  const [trucks, setTrucks] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedTruck, setSelectedTruck] = useState([])
  const [openIframe, setOpenIframe] = useState(0)

    useEffect(()=>{
        getTrucks()
    },[])

    function getTrucks() {
      fetch('https://api.ttfconstruction.com/getTrucks.php')
      .then(response => response.json())
      .then(response => {
          console.log(response);
          // Assuming the response is an array of truck objects with a "date" property
          const sortedTrucks = response.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTrucks(sortedTrucks);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  function formatDate(date){
    let preFormat = new Date(date).toLocaleDateString('en-US', {
       month: '2-digit',
       day: '2-digit',
       year: 'numeric',
     });
     const dateStr = preFormat
     const dateObj = new Date(dateStr);
     const options = { year: 'numeric', month: 'long', day: 'numeric' };
     const formattedDate = dateObj.toLocaleDateString('en-US', options);

     return formattedDate
 }

  function showTruck(id, company, location, date, time){
      setSelectedTruck({id, company, location, date, time})
      setShowSidebar(true)
  }

  useEffect(()=>{
    console.log(openIframe);
  },[openIframe])


  return (
    <div className='wrapper-trucksPage'>
      <div>
        <Sidebar />
      </div>
      <div className='content' >
        <div className='header'>
          <h1> Trucks </h1>
          <i className="bi bi-layout-sidebar-inset-reverse iconSidebar" onClick={()=>setShowSidebar(!showSidebar)}></i>
        </div>
        <div className="main-grid" style={{display: showSidebar? "grid":"block"}}>
          <div className='trucks'>
            {trucks.map((truck) => (
              <div className={showSidebar? "shortRow":"row"} onClick={()=>showTruck(truck.id, truck.company, truck.location, truck.date, truck.time)}>
                <p id="company"> {truck.company} </p>
                <p> {truck.location} </p>
                <p> {formatDate(truck.date)} </p>
                <p style={{display: showSidebar? "none":"block"}}> {truck.time} </p>
              </div>
            ))}
          </div>
          <div className="sideBar" style={{display: showSidebar? "block":"none"}}>
            <p id="company"> <b>{selectedTruck.company}</b> </p>
            <p> {selectedTruck.location}</p>
            <p> {formatDate(selectedTruck.date)}</p>
            <p> {selectedTruck.time}</p>
            <br></br>
            <iframe className={openIframe == 1 ? 'iframeOpen':""} onClick={()=>setOpenIframe(1)} src={'https://api.ttfconstruction.com/getImage1.php?id=' + selectedTruck.id} />
            <iframe className={openIframe == 2 ? 'iframeOpen':""} onClick={()=>setOpenIframe(2)} src={'https://api.ttfconstruction.com/getImage2.php?id=' + selectedTruck.id} />  
            <iframe className={openIframe == 3 ? 'iframeOpen':""} onClick={()=>setOpenIframe(3)} src={'https://api.ttfconstruction.com/getImage3.php?id=' + selectedTruck.id} />
          </div>
        </div>
      </div>
      </div>
  )
}

export default Trucks


  
 