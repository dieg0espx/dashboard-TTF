import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

function Trucks() {

  const [trucks, setTrucks] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedTruck, setSelectedTruck] = useState([])
  const [openIframe, setOpenIframe] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [updatedTruck, setUpdatedTruck] = useState({company: '', location: '', status:'', date: '', time:'', id: ''})

  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    useEffect(()=>{
        getTrucks()
        window.innerWidth < 600 ? setIsMobile(true):setIsMobile(false)
    },[])


  function getTrucks() {
      fetch( apiURL + '/getTrucks.php')
      .then(response => response.json())
      .then(response => {
          // console.log(response);
          const sortedTrucks = response.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTrucks(response);
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

  function showTruck(id, company, location, date, time, status){
      setSelectedTruck({id, company, location, date, time, status})
      setUpdatedTruck({id, company, location, date, time, status})
      setShowSidebar(true)
  }

  function openImage(url){
    setShowPopup(true)
    setSelectedImage(url)
    console.log(url);
  }

  function hidePopups(){
    setShowPopup(false)
    setShowUpdatePopup(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the state with new value for the specific property
    setUpdatedTruck({
      ...updatedTruck,
      [name]: value
    });
  };
  
  async function updateTruck(){
    const jsonString = JSON.stringify(updatedTruck);
    const response =  await fetch( apiURL + '/updateTruck.php?data=' + jsonString)
    if(response.status  == 200){
      alert("Truck Updated successfully !")
      getTrucks()
      setSelectedTruck(updatedTruck)
      setShowUpdatePopup(false)
    } else {
      alert("Error Updating Truck :( ")
    }

  }



  return (
    <div className='wrapper-trucksPage'>
      <div>
        <Sidebar />
      </div>
      <div className='content' >
        <div className='header'>
          <div id="left">
            <h1> Trucks </h1>
            <p><i className='bi bi-circle-fill shippingBullet'></i> Shipping </p>
            <p><i className='bi bi-circle-fill returnBullet'></i> Return </p>
          </div>
          <i className="bi bi-layout-sidebar-inset-reverse iconSidebar" onClick={()=>setShowSidebar(!showSidebar)}></i>
        </div>
        <div className="main-grid" style={{display: showSidebar ? "grid":"block"}}>
          <div className='trucks'>
            {trucks.map((truck) => (
              <div className={showSidebar? "shortRow":"row"} onClick={()=>showTruck(truck.id, truck.company, truck.location, truck.date, truck.time, truck.status)}>
                <p id="company"> <i className= {truck.status == 'Return' ? "bi bi-circle-fill returnBullet":"bi bi-circle-fill shippingBullet"}></i> {truck.company} </p>
                <p> {truck.location} </p>
                <p> {formatDate(truck.date)} </p>
                <p style={{display: showSidebar && !isMobile? "none":"block"}}> {truck.time} </p>
              </div>
            ))}
          </div>
          <div className='overlay' style={{display: showSidebar && isMobile? "block":"none"}} onClick={()=>setShowSidebar(false)}/>
          <div className="sideBar" style={{ display: showSidebar ? "block" : "none" }}>
            {selectedTruck.company ? (
              <>
                <div className='two-col'>
                  <p id="company"><b>{selectedTruck.company}</b></p>  
                  <i className="bi bi-pencil-square iconEdit" onClick={()=>setShowUpdatePopup(!showUpdatePopup)}></i>
                </div>
                
                <p id="status"><i className= {selectedTruck.status == 'Return' ? "bi bi-circle-fill returnBullet":"bi bi-circle-fill shippingBullet"}></i> {selectedTruck.status}</p>
                <p>{selectedTruck.location}</p>
                <p>{formatDate(selectedTruck.date)}</p>
                <p>{selectedTruck.time}</p>
                <br />
                <iframe
                  src={apiURL+'/getImage1.php?id=' + selectedTruck.id}
                  onClick={() => console.log('a')}
                  title="Image 1"
                />
                <div
                  className='imageOpener'
                  onClick={() =>
                    openImage(apiURL + '/getImage1.php?id=' + selectedTruck.id)
                  }
                />
                <iframe
                  src={apiURL + '/getImage2.php?id=' + selectedTruck.id}
                  onClick={() => openImage(2)}
                  title="Image 2"
                />
                <div
                  className='imageOpener'
                  onClick={() =>
                    openImage(apiURL + '/getImage2.php?id=' + selectedTruck.id)
                  }
                />
                <iframe
                  src={apiURL + '/getImage3.php?id=' + selectedTruck.id}
                  onClick={() => openImage(3)}
                  title="Image 3"
                />
                <div
                  className='imageOpener'
                  onClick={() =>
                    openImage(apiURL + '/getImage3.php?id=' + selectedTruck.id)
                  }
                />
                 <iframe
                  src={apiURL + '/getImage4.php?id=' + selectedTruck.id}
                  onClick={() => openImage(4)}
                  title="Image 4"
                />
                <div
                  className='imageOpener'
                  onClick={() =>
                    openImage(apiURL + '/getImage4.php?id=' + selectedTruck.id)
                  }
                />
                <iframe
                  src={apiURL + '/getImage5.php?id=' + selectedTruck.id}
                  onClick={() => openImage(5)}
                  title="Image 5"
                />
                <div
                  className='imageOpener'
                  onClick={() =>
                    openImage(apiURL + '/getImage5.php?id=' + selectedTruck.id)
                  }
                />
                 <iframe
                  src={apiURL + '/getImage6.php?id=' + selectedTruck.id}
                  onClick={() => openImage(6)}
                  title="Image 6"
                />
                <div
                  className='imageOpener'
                  onClick={() =>
                    openImage(apiURL + '/getImage6.php?id=' + selectedTruck.id)
                  }
                />
              </>
            ) : (
              <p className='emptyArray'>Nothing Selected</p>
            )}
          </div>
          <div className='overlay' style={{ display: showPopup || showUpdatePopup ? "block" : "none" }} onClick={() => hidePopups()}/>
          <div className='image-popup' style={{ display: showPopup ? "block" : "none" }}>
            <iframe src={selectedImage} title="Selected Image" />
          </div>
          <div className='update-popup' style={{display: showUpdatePopup? "flex":"none"}}>
            <h2> Update Truck </h2>
            <div className='form'>
              <input className="field" type='text' value={updatedTruck.company} name='company' onChange={handleInputChange} placeholder='Company Name'/>
              <input className="field" type='text' value={updatedTruck.location} name='location' onChange={handleInputChange} placeholder='Jobsite Address' />
              <select className='field' value={updatedTruck.status} name='status' onChange={handleInputChange}>
                <option value={'shipping'}> Shipping </option>
                <option value={'Return'}> Return </option>
              </select>
              <input className="field" type='date' value={updatedTruck.date} name='date' onChange={handleInputChange}/>
              <input className="field" type='time' value={updatedTruck.time} name='time' onChange={handleInputChange}/>
              <button onClick={()=> updateTruck()}> Update </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trucks


  
 