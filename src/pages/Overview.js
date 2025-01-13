import { useEffect, useState } from 'react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import { useOrders } from '../context/OrdersContext'
import YearsOrders from '../components/YearsOrders'
import OrdersPerCompany from '../components/OrdersPerCompany'
import JobsitesPerCompany from '../components/JobsitePerCompany'

function Overview() {
    const { orders, ordersDates } = useOrders();
    

    return (
        <div className='wrapper-orders'>
          <Sidebar/>          
          <div className='content'>
            <div className='header'>
              <h1> Overview </h1>
            </div>
            <div>
                <div>
                    <YearsOrders orders={ordersDates}/>
                </div>
                <div className='grid grid-cols-2 gap-[25px] w-[95%] mx-auto'>
                    <OrdersPerCompany orders={orders} />
                    <JobsitesPerCompany orders={orders} />
                </div>
                
            </div>
          </div>
        </div>
      )
    }
    
    export default Overview
    