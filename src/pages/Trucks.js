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
  const [zoomImage1, setZoomImage1] = useState(false)
  const [zoomImage2, setZoomImage2] = useState(false)
  const [zoomImage3, setZoomImage3] = useState(false)
  const [zoomImage4, setZoomImage4] = useState(false)
  const [zoomImage5, setZoomImage5] = useState(false)
  const [zoomImage6, setZoomImage6] = useState(false)

  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [updatedTruck, setUpdatedTruck] = useState({company: '', location: '', status:'', date: '', time:'', id: ''})

  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    useEffect(()=>{
        getTrucks()
        getNewTrucks()
        window.innerWidth < 600 ? setIsMobile(true):setIsMobile(false)
    },[])


  async function getTrucks() {
      let trucks = []
      let newTrucks = []
      let allTrucks = []

      await fetch( apiURL + '/getTrucks.php')
      .then(response => response.json())
      .then(response => {
          // console.log(response);
          const sortedTrucks = response.sort((a, b) => new Date(b.date) - new Date(a.date));
          trucks = sortedTrucks
      })
      .catch(error => {
          console.error('Error:', error);
      });

      await fetch('https://api.ttfconstruction.com/getAllTrucks.php')
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        const sortedTrucks = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        newTrucks = sortedTrucks
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // console.log("===== ALL TRUCKS =====");
    // console.log(trucks);
    // console.log(newTrucks);
    allTrucks = trucks.concat(newTrucks)
    let sortedTrucks = allTrucks.sort((a, b) => new Date(b.date) - new Date(a.date));
    // console.log(sortedTrucks);
    setTrucks(sortedTrucks)
  }
  
  async function getNewTrucks(){

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

  function showTruck(id, company, location, date, time, status, image1, image2, image3, iumage4, image5, image6, imageOrigin){
      let truck = {id, company, location, date, time, status, image1, image2, image3, iumage4, image5, image6, imageOrigin}
      setSelectedTruck(truck)
      setUpdatedTruck(truck)
      setShowSidebar(true)
  }

  function openImage(url){
    setShowPopup(true)
    setSelectedImage(url)
  }


  function hidePopups(){
    setShowPopup(false)
    setShowUpdatePopup(false)
    setZoomImage1(false)
    setZoomImage2(false)
    setZoomImage3(false)
    setZoomImage4(false)
    setZoomImage5(false)
    setZoomImage6(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the state with new value for the specific property
    setUpdatedTruck({
      ...updatedTruck,
      [name]: value
    });
  };
  
  async function updateTruck(imageOrigin){
    const jsonString = JSON.stringify(updatedTruck);
    let response;
    console.log(imageOrigin);
    if(imageOrigin == "Cloudinary"){
      response =  await fetch( apiURL + '/updateTruck2.php?data=' + jsonString)   
    } else {
      response =  await fetch( apiURL + '/updateTruck.php?data=' + jsonString)
    }
    console.log(response);
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
              <div className={showSidebar? "shortRow":"row"} onClick={()=>showTruck(truck.id, truck.company, truck.location, truck.date, truck.time, truck.status, truck.image1,truck.image2, truck.image3,truck.image4,truck.image5,truck.image6,truck.imageOrigin)}>
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
                {selectedTruck.imageOrigin == 'Cloudinary' ? (
                  <div style={{display: !selectedTruck.image1 == '' ? "block":"none"}}>
                    <img src={selectedTruck.image1} alt="Truck" className={zoomImage1? "imageZoomed":""} />
                    <div className='imageOpener' onClick={() => setZoomImage1(true)}/>
                  </div>
                    
                  ) : (
                  <div>
                    <iframe src={apiURL+'/getImage1.php?id=' + selectedTruck.id} onClick={() => console.log('a')} title="Image 1"/>
                    <div className='imageOpener' onClick={() => openImage(apiURL + '/getImage1.php?id=' + selectedTruck.id)}/>
                  </div>
                  )
                }

                {selectedTruck.imageOrigin == 'Cloudinary' ? (
                  <div style={{display: !selectedTruck.image2 == '' ? "block":"none"}}>
                    <img src={selectedTruck.image2} alt="Truck" className={zoomImage2? "imageZoomed":""} />
                    <div className='imageOpener' onClick={() =>setZoomImage2(true)}/>
                  </div>
                    
                  ) : (
                  <div>
                    <iframe src={apiURL+'/getImage2.php?id=' + selectedTruck.id} onClick={() => console.log('a')} title="Image 1"/>
                    <div className='imageOpener' onClick={() => openImage(apiURL + '/getImage2.php?id=' + selectedTruck.id)}/>
                  </div>
                  )
                }

                {selectedTruck.imageOrigin == 'Cloudinary' ? (
                  <div style={{display: !selectedTruck.image3 == '' ? "block":"none"}}>
                    <img src={selectedTruck.image3} alt="Truck" className={zoomImage3? "imageZoomed":""} />
                    <div className='imageOpener' onClick={() => setZoomImage3(true)}/>
                  </div>
                    
                  ) : (
                  <div>
                    <iframe src={apiURL+'/getImage3.php?id=' + selectedTruck.id} onClick={() => console.log('a')} title="Image 1"/>
                    <div className='imageOpener' onClick={() => openImage(apiURL + '/getImage3.php?id=' + selectedTruck.id)}/>
                  </div>
                  )
                }

                {selectedTruck.imageOrigin == 'Cloudinary' ? (
                  <div style={{display: !selectedTruck.image4 == '' ? "block":"none"}}>
                    <img src={selectedTruck.image4} alt="Truck" className={zoomImage4? "imageZoomed":""} />
                    <div className='imageOpener' onClick={() => setZoomImage4(true)}/>
                  </div>
                    
                  ) : (
                  <div>
                    <iframe src={apiURL+'/getImage4.php?id=' + selectedTruck.id} onClick={() => console.log('a')} title="Image 1"/>
                    <div className='imageOpener' onClick={() => openImage(apiURL + '/getImage4.php?id=' + selectedTruck.id)}/>
                  </div>
                  )
                }

                {selectedTruck.imageOrigin == 'Cloudinary' ? (
                  <div style={{display: !selectedTruck.image5 == '' ? "block":"none"}}>
                    <img src={selectedTruck.image5} alt="Truck" className={zoomImage5? "imageZoomed":""} />
                    <div className='imageOpener' onClick={() => setZoomImage5(true)}/>
                  </div>
                    
                  ) : (
                  <div>
                    <iframe src={apiURL+'/getImage5.php?id=' + selectedTruck.id} onClick={() => console.log('a')} title="Image 1"/>
                    <div className='imageOpener' onClick={() => openImage(apiURL + '/getImage5.php?id=' + selectedTruck.id)}/>
                  </div>
                  )
                }

                {selectedTruck.imageOrigin == 'Cloudinary' ? (
                  <div style={{display: !selectedTruck.image6 == '' ? "block":"none"}}>
                    <img src={selectedTruck.image6} alt="Truck" className={zoomImage6? "imageZoomed":""} />
                    <div className='imageOpener' onClick={() => setZoomImage6(true)}/>
                  </div>
                    
                  ) : (
                  <div>
                    <iframe src={apiURL+'/getImage6.php?id=' + selectedTruck.id} onClick={() => console.log('a')} title="Image 1"/>
                    <div className='imageOpener' onClick={() => openImage(apiURL + '/getImage6.php?id=' + selectedTruck.id)}/>
                  </div>
                  )
                } 

              </>
            ) : (
              <p className='emptyArray'>Nothing Selected</p>
            )}
          </div>
          <div className='overlay' style={{ display: showPopup || showUpdatePopup || zoomImage1 || zoomImage2 || zoomImage3 || zoomImage4 || zoomImage5 || zoomImage6 ? "block" : "none" }} onClick={() => hidePopups()}/>
          <div className='image-popup' style={{ display: showPopup ? "block" : "none" }}>
            <iframe src={selectedImage} title="Selected Image" className='image-viewer' />
          </div>
          <div className='update-popup' style={{display: showUpdatePopup? "flex":"none"}}>
            <h2> Update Truck </h2>
            {updatedTruck.imageOrigin}
            <div className='form'>
              <input className="field" type='text' value={updatedTruck.company} name='company' onChange={handleInputChange} placeholder='Company Name'/>
              <input className="field" type='text' value={updatedTruck.location} name='location' onChange={handleInputChange} placeholder='Jobsite Address' />
              <select className='field' value={updatedTruck.status} name='status' onChange={handleInputChange}>
                <option value={'shipping'}> Shipping </option>
                <option value={'Return'}> Return </option>
              </select>
              <input className="field" type='date' value={updatedTruck.date} name='date' onChange={handleInputChange}/>
              <input className="field" type='time' value={updatedTruck.time} name='time' onChange={handleInputChange}/>
              <button onClick={()=> updateTruck(updatedTruck.imageOrigin)}> Update </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trucks


  
 