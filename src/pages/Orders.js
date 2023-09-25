import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/Sidebar' 


function Orders() {
    const [todayOrders, setTodayOrders] = useState([]);
    const [upcomingOrders, setUpcomingOrders] = useState([])
    const [pastOrders, setPastOrders] = useState([]);
    const [isEditing, setIsEditing]= useState(false)
    const [urlToPrint, setUrlToPrint] = useState('')
    const [isMobile, setIsMobile] = useState(false)

    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;


    function isSameDate(date1, date2) {
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
      }
    
    useEffect(() => {
        getOrders();
        if(window.innerWidth < 600){
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
    }, []);


    function getOrders(){
      fetch(apiURL + '/getOrders.php')
        .then(response => response.json())
        .then(response => {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0); // Set to the beginning of tomorrow
          const pastLimit = new Date();
          pastLimit.setDate(pastLimit.getDate() - 30); 
    
          const todayOrders = response.filter(order => isSameDate(new Date(order.date), today));
          const upcomingOrders = response.filter(order => new Date(order.date) >= tomorrow);
          const pastOrders = response.filter(order => new Date(order.date) < today && new Date(order.date) >= pastLimit && !isSameDate(new Date(order.date), today));
    
          const sortedUpcomingOrders = upcomingOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
          const sortedPastOrders = pastOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
          setTodayOrders(todayOrders);
          setUpcomingOrders(sortedUpcomingOrders);
          setPastOrders(sortedPastOrders);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    

    
    
      
    function formatDate(date){
        let formattedDate = new Date(date).toLocaleString("en-US", {
            dateStyle: "long",
        })
        return isMobile? date : formattedDate
    }

    

    const iframeRef = useRef(null);
    function printOrder(url){
      if(url == urlToPrint) {
        iframeRef.current.contentWindow.location.reload();
      } else {
        setUrlToPrint(url)
      }
    }
    function confirmDelete(id, company, date){
      if (window.confirm('DELETE ' + company + " - " + date + " ?")) {
          deleteOrder(id)
      } else {
    
      }
    }

    function deleteOrder(id){
      fetch(apiURL + '/deleteOrder.php?id=' + id );
      getOrders();
    }

  return (
    <div className='wrapper-orders'>
      <Sidebar/>
      <iframe ref={iframeRef} src={urlToPrint} />
      <div className='content'>
        <div className='header'>
          <h1> Orders </h1>
          <div className='actions'>
            <i className="bi bi-plus-lg plusIcon" onClick={()=>window.location.href="#/newOrder"}></i>
            <i className="bi bi-sliders sliderIcon" onClick={()=>setIsEditing(!isEditing)}></i>
          </div>
        </div>
        <div className='orders'>
            <div style={{display: todayOrders.length > 0 ? "block":"none"}}>
              <h2> Today's Orders</h2>
              {todayOrders.map((order) => (   
                <div className='full-order'>
                  <div className="order" key={order.id} onClick={()=>window.location.href= '#/order?id=' + order.id}>
                      <div id='left'>
                          <p> <b>{order.company}</b> </p>
                          <p> {order.jobsite} </p>
                      </div>
                      <div id="right" style={{display: isMobile && isEditing ? "none":"block"}}>
                      <p className='includeDrawings' style={{display: order.drawings == 'true' && !isMobile? "block":"none"}}>Include Drawings</p>
                        <p> {formatDate(order.date)} </p>
                      
                      </div>
                  </div>
                  <div className="order-actions" style={{display : isEditing? "flex":"none"}}>
                    <button onClick={()=>printOrder('#/sheet?id=' + order.id)}> <i className="bi bi-printer printerIcon"></i> </button>
                    <button onClick={()=>confirmDelete(order.id, order.company, formatDate(order.date))}> <i className="bi bi-trash trashIcon"></i> </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display: upcomingOrders.length > 0 ? "block":"none"}}>
              <h2> Upcoming Orders </h2>
              {upcomingOrders.map((order) => (   
                <div className='full-order'>
                  <div className="order" key={order.id} onClick={()=>window.location.href= '#/order?id=' + order.id}>
                      <div id='left'>
                          <p> <b>{order.company}</b> </p>
                          <p> {order.jobsite} </p>
                      </div>
                      <div id="right" style={{display: isMobile && isEditing ? "none":"block"}}>
                      <p className='includeDrawings' style={{display: order.drawings == 'true' && !isMobile? "block":"none"}}>Include Drawings</p>
                      <p> {formatDate(order.date)} </p>
                      </div>
                  </div>
                  <div className="order-actions" style={{display : isEditing? "flex":"none"}}>
                    <button onClick={()=>printOrder('#/sheet?id=' + order.id)}> <i className="bi bi-printer printerIcon"></i> </button>
                    <button onClick={()=>confirmDelete(order.id, order.company, formatDate(order.date))}> <i className="bi bi-trash trashIcon"></i> </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display: pastOrders.length > 0 ? "block":"none"}}>
              <h2> Past Orders </h2>
              {pastOrders.map((order) => (   
                <div className='full-order'>
                  <div className="order" key={order.id} onClick={()=>window.location.href= '#/order?id=' + order.id}>
                      <div id='left'>
                          <p> <b>{order.company}</b> </p>
                          <p> {order.jobsite} </p>
                      </div>
                      <div id="right" style={{display: isMobile && isEditing ? "none":"block"}}>
                      <p className='includeDrawings' style={{display: order.drawings == 'true' && !isMobile? "block":"none"}}>Include Drawings</p>
                      <p> {formatDate(order.date)} </p>
                      </div>
                  </div>
                  <div className="order-actions" style={{display : isEditing? "flex":"none"}}>
                    <button onClick={()=>printOrder('#/sheet?id=' + order.id)}> <i className="bi bi-printer printerIcon"></i> </button>
                    <button onClick={()=>confirmDelete(order.id, order.company, formatDate(order.date))}> <i className="bi bi-trash trashIcon"></i> </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
