import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useSearchParams } from 'react-router-dom'
import { setSelectionRange } from '@testing-library/user-event/dist/utils'

function Damages() {
    const [damages, setDamages] = useState([])
    const [showSidebar, setShowSidebar] = useState(false)
    const [damageSelected, setDamageSelected] = useState([])
    const [selectedImage, setSelectedImage] = useState()
    const [showPopup, setShowPopup] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(()=>{
        getDamages()
        if(window.innerWidth < 600){
          setIsMobile(true)
        }
    },[])

    function getDamages() {
        fetch('https://api.ttfconstruction.com/getDamages.php')
        .then(response => response.json())
        .then(response => {
            const sortedDamages = response.sort((a, b) => {
                const dateA = new Date(a.theDate);
                const dateB = new Date(b.theDate);
                return dateB - dateA;
            });    
            setDamages(sortedDamages);
        });
    }

    function formatDate(date){
        let formattedDate = new Date(date).toLocaleString("en-US", {
            dateStyle: "long",
        })
        return formattedDate
    }

    function selectDamage(id, company, location, date, description){
        setShowSidebar(true)
        setDamageSelected({id:id, company:company, location:location, date:date, description:description })
    }

    function openImage(url){
        setShowPopup(true)
        setSelectedImage(url)
      }

  return (
    <div className='wrapper-damages'>
      <Sidebar/>
      <div className='content'>
        <div className='header'>
          <h1> Damages </h1>
          <i className="bi bi-layout-sidebar-inset-reverse iconSidebar" onClick={()=>setShowSidebar(!showSidebar)}></i>
        </div>
        <div className='main-grid' style={{display: showSidebar? "grid":"block"}}>
            <div className='damages'>
                {damages.map((damage) => (
                    <div key={damage.id} className='row-damage' onClick={()=>selectDamage(damage.id, damage.company, damage.theLocation, damage.theDate, damage.theDescription)}>
                        <p id="company">{damage.company}</p>
                        <p> {damage.theLocation} </p>
                        <p> {formatDate(damage.theDate)} </p>
                    </div>
                ))}
            </div>
            <div className='overlay' style={{display: isMobile && showSidebar ? "block":"none"}} onClick={()=>setShowSidebar(!showSidebar)} />
            <div className='sidebar' style={{display: showSidebar? "block":"none"}}>
                { damageSelected.company ? (
                    <div>
                      <p id="company">{damageSelected.company}</p>
                      <p id="location">{damageSelected.location}</p>
                      <p id="date">{formatDate(damageSelected.date)}</p>
                      <p id="description"><b>Description: </b>{damageSelected.description}</p>
                      <iframe src={`https://api.ttfconstruction.com/getDamage.php?id=${damageSelected.id}`} />
                      <div className='imageOpener' onClick={() => openImage(`https://api.ttfconstruction.com/getDamage.php?id=${damageSelected.id}`)}></div>
                      <div className='overlay' style={{ display: showPopup ? "block" : "none" }} onClick={() => setShowPopup(false)}></div>
                      <div className='image-popup' style={{ display: showPopup ? "block" : "none" }}>
                        <iframe src={selectedImage} />
                      </div>
                    </div>
                  ) : (
                    <p className='emptyArray'>Nothing Selected</p>
                  )
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Damages
