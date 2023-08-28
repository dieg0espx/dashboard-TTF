import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import logo from '../images/logo.png'

function PrintPayroll() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    const paramValue = searchParams.get('data');

    const [payroll, setPayroll] = useState([])
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    

    useEffect(()=>{
        setPayroll(JSON.parse(paramValue))
        setFrom(searchParams.get('from'))
        setTo(searchParams.get('to'))
    },[])

    // useEffect(()=>{
    //     if(payroll.length > ){
    //         window.print()
    //     }
    // }, [payroll])

    function printDocument(){
        window.print()
    }


  return (
    <div className='wrapper-printPayroll'>
        <div className='header'>
            <img src={logo} onLoad={()=>printDocument()}/>
            <div>
                <p> 10979 Olsen Road        </p>
                <p> Surrey, BC              </p>
                <p> V3V 3S9                 </p>
                <p> Tel:(778) 898-5301      </p>
                <p> info@ttfscaffolding.com </p>
            </div>
        </div>
        <h2> PAYROLL </h2>

        <h3> <b>From:</b> {from}</h3>
        <h3> <b>To:</b> {to}</h3>
        <table>
            <tr>
                <th> Code </th>
                <th> Name </th>
                <th> Reg. Hours </th>
                <th> OT. Hours </th>
                <th> Total  </th>
            </tr>
            {payroll.map((row) => (
             <tr>
                 <td> {row.code} </td> 
                 <td> {row.name} </td> 
                 <td> {row.reg}  </td> 
                 <td> {row.ot}   </td> 
                 <td> {row.tot}  </td> 
             </tr>
            ))}
        </table>
    </div>
    
  )
}

export default PrintPayroll
