import { useEffect, useState } from 'react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import { useOrders } from '../context/OrdersContext'
import YearsOrders from '../components/YearsOrders'
import OrdersPerCompany from '../components/OrdersPerCompany'
import JobsitesPerCompany from '../components/JobsitePerCompany'
import JobsitesPerMonth from '../components/JobsitesPerMonth'
import TotalStats from '../components/TotalStats'

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
                    <TotalStats/>
                </div>
               
                <div>
                    <JobsitesPerMonth/>
                </div>
                <div className='flex justify-between w-[95%] mx-auto gap-[40px] mt-[40px]'>
                    <OrdersPerCompany orders={orders} />
                    <JobsitesPerCompany orders={orders} />
                </div>
                <div>
                    <YearsOrders orders={ordersDates}/>
                </div>
                
            </div>
          </div>
        </div>
      )
    }
    
    export default Overview
    