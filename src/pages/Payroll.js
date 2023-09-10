import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Switch from "react-switch";
import { Calendar } from 'react-calendar'
import { format, addDays, eachDayOfInterval, differenceInDays } from 'date-fns';


function Payroll() {
    const [showPopup, setShowPopUp] = useState(false)
    const [hours, setHours] = useState([])
    const [employees, setEmployees] = useState([])

    const [id, setID] = useState()
    const [name, setName] = useState('')
    const [signIn, setSignIn] = useState()
    const [signOut, setSignOut] = useState()
    const [regHours, setRegHours] = useState()
    const [otHours, setOtHours] = useState()
    const [date, setDate] = useState()

    const [showSidebar, setShowSidebar] = useState(true)
    const [enableSwitch, setEnableSwitch] = useState(false)
    const [selectedEmployeeCodes, setSelectedEmployeeCodes] = useState([]);
    const [rangeDates, setRangeDates] = useState([])
    const [payroll, setPayroll] = useState([]);
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [payrollURL, setPayrollURL] = useState('')

    const [filterFrom, setFilterFrom] = useState()
    const [filterTo, setFilterTo] = useState()
    const [filterCode, setFilterCode] = useState('')

    useEffect(()=>{
        getHours()
        getEmployees()
    },[])

    function getHours() {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 5);
    
      console.log(rangeDates);
      fetch('https://api.ttfconstruction.com/getHours.php')
        .then(response => response.json())
        .then(response => {
          let formattedResponse = response.map(item => ({
            ...item,
            otHours: parseFloat(item.otHours).toFixed(2),
            regHours: parseFloat(item.regHours).toFixed(2),
          }));
          formattedResponse = formattedResponse.filter(item => new Date(item.date) >= threeMonthsAgo);
          formattedResponse.sort((a, b) => new Date(b.date) - new Date(a.date));
          setHours(formattedResponse);
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

    function updateRow(id, name, signIn, signOut, date){
        setShowPopUp(true)
        setName(name)
        setSignIn(signIn)
        setSignOut(signOut)
        setDate(date)
        setID(id)
    }

    async function saveNewHours(){
        fetch(`http://localhost:3002/api/updateHours/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, signIn, signOut, regHours, otHours }),
          })
          .then(response => response.json())
          .then(response =>  console.log(response))
          setShowPopUp(false)
          getHours()
    }

    function calculateHours(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        const timeDifferenceMs = end - start;
        const hours = timeDifferenceMs / (1000 * 60 * 60); // Convert milliseconds to hours
        return hours;
    }
      
    useEffect(() => {
      const hoursWorked = calculateHours(signIn, signOut);
    
      if (hoursWorked > 8) {
        setRegHours(8);
        setOtHours(hoursWorked - 8);
      } else {
        setRegHours(hoursWorked);
        setOtHours(0);
      }
    }, [signIn, signOut]);

    const onDateSelected = async (range) => {
      setFrom(formatDate(range[0]))
      setTo(formatDate(range[1]))
      getDatesBetween(range[0], range[1])
    }

    function getDatesBetween(startDate, endDate){
      const daysDifference = differenceInDays(endDate, startDate);
      const datesInRange = [];
      for (let i = 0; i <= daysDifference; i++) {
        const currentDate = addDays(startDate, i);
        datesInRange.push(formatDate(currentDate));
      }
      console.log(datesInRange);
      setRangeDates(datesInRange)
    }

    function generatePayroll(){
      setPayroll([])
      if(rangeDates.length < 1 || selectedEmployeeCodes <=0){
        alert("Please select Dates and Employees");
      } else {
        for (let e = 0; e < employees.length; e++) {
          if(selectedEmployeeCodes.includes(employees[e].code)){
            // console.log(employees[e].name); 
            let code = employees[e].code
            let name = employees[e].name
            let reg = 0
            let ot = 0
            let tot = 0
            for (let i = 0; i < hours.length; i++) {
              if (rangeDates.includes(formatDate(hours[i].date))) {
                if (hours[i].code === employees[e].code) {
                  const regHoursDouble = parseFloat(hours[i].regHours);
                  const otHoursDouble = parseFloat(hours[i].otHours);
                  reg = reg + regHoursDouble
                  if(employees[e].contracted ==1){
                    ot = ot + (otHoursDouble * 1.5)
                  } else {
                    ot = ot + otHoursDouble
                  }
                }
                tot = reg + ot
              }
            }
            payroll.push({code: code, name: name, reg: reg.toFixed(2), ot:ot.toFixed(2), tot:tot.toFixed(2)})
          }
        } 
        console.log(payroll);
        printPayroll( "#/printPayroll/?data=" + JSON.stringify(payroll) + "&&from=" +  from + "&&to=" + to) 
      }
    }

    const iframeRef = useRef(null);
    function printPayroll(url){
      if(url == payrollURL) {
        iframeRef.current.contentWindow.location.reload();
      } else {
        setPayrollURL(url)
      }
    }
  
    function getEmployees() {
      fetch('https://api.ttfconstruction.com/getEmployees.php')
      .then(response => response.json())
      .then(response => {
          const filteredEmployees = response.filter(employee =>
              employee.name !== 'Navid Badizadeh' &&
              employee.name !== 'Jason James' &&
              employee.name !== 'Luis Silva'
          );
          const sortedEmployees = filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
          setEmployees(sortedEmployees);
      })
      .catch(error => {
          console.error('Error fetching employee data:', error);
      });
    }


    const handleEmployeeClick = (employeeCode) => {
      if (selectedEmployeeCodes.includes(employeeCode)) {
        setSelectedEmployeeCodes(selectedEmployeeCodes.filter(code => code !== employeeCode));
      } else {
        setSelectedEmployeeCodes([...selectedEmployeeCodes, employeeCode]);
      }
    };

    const handleSelectAll = () => {
      const allEmployeeCodes = employees.map(employee => employee.code);
      setSelectedEmployeeCodes(allEmployeeCodes);
    };

    function switchChanged(){
      setEnableSwitch(!enableSwitch)
      if(enableSwitch){
        setSelectedEmployeeCodes([])
      } else {
        handleSelectAll();
      }
    }

    useEffect(()=>{
      if(selectedEmployeeCodes.length < employees.length){
        setEnableSwitch(false)
      }
    },[selectedEmployeeCodes])

      
  return (
    <div className='wrapper-payroll'>
      <div>
        <Sidebar />
      </div>
      <div className='content' >
        <div className='header'>
          <h1> Payroll </h1>
          <div className='actions'>
            <div className='filter'>
              <input type='date' onChange={(e)=>setFilterFrom(e.target.value)}></input>
              <input type='date' onChange={(e)=>setFilterTo(e.target.value)}></input>
              <select onChange={(e)=>setFilterCode(e.target.value)}>
                <option disabled selected> Select Employee </option>
                {employees.map((employee, index) => (
                  <option key={employee.code} value={employee.code}>{employee.name}</option>
                ))}
              </select>
              <button> Find </button>
            </div>
            <i className="bi bi-layout-sidebar-inset-reverse iconSidebar" onClick={()=>setShowSidebar(!showSidebar)}></i>
          </div>
        
        </div>
        <div className='main-grid' style={{display: showSidebar ? "grid":"block"}}>
            <div className='hours' style={{display: filterCode == '' ? "none":"block"}}>
            {
               hours.map((row) => {
                 if (
                   (filterCode === '' || row.code === filterCode) &&
                   (filterFrom === '' || row.date > filterFrom) &&
                   (filterTo === '' || row.date <= filterTo)
                 ) {
                   return (
                     <div key={row.id} className='row' onClick={() =>   updateRow(row.id, row.name, row.signIn, row.signOut, row.date) } style={{   gridTemplateColumns: showSidebar ? '70px 150px auto auto auto auto auto': '120px 150px auto auto auto auto auto' }}>
                       <p>{row.code}</p>
                       <p id='name'><b>{row.name}</b></p>
                       <p>{row.signIn}</p>
                       <p>{row.signOut}</p>
                       <p>{row.regHours}</p>
                       <p>{row.otHours}</p>
                       <p>{formatDate(row.date)}</p>
                     </div>
                   );
                 }
                 return null; 
               })
              }
            </div>
            <div className='hours' style={{display: filterCode == '' ? "block":"none"}}>
              {hours.map((row) => {                 
                   return (
                     <div key={row.id} className='row' onClick={() =>   updateRow(row.id, row.name, row.signIn, row.signOut, row.date) } style={{   gridTemplateColumns: showSidebar ? '70px 150px auto auto auto auto auto': '120px 150px auto auto auto auto auto' }}>
                       <p>{row.code}</p>
                       <p id='name'><b>{row.name}</b></p>
                       <p>{row.signIn}</p>
                       <p>{row.signOut}</p>
                       <p>{row.regHours}</p>
                       <p>{row.otHours}</p>
                       <p>{formatDate(row.date)}</p>
                     </div>
                   )})
              }
            </div>

            <div className="sideBar" style={{display: showSidebar? "block":"none"}}>
              <h3> New Payroll </h3>
                <Calendar
                  selectRange={true}
                  onChange={onDateSelected}
                />
                <div className='selectAll'>
                  <p> Select All </p>
                  <Switch className="sidebarSwitch" checked={enableSwitch} uncheckedIcon={false} checkedIcon={false} onColor='#65D1B5' onChange={()=>switchChanged()}/>
                </div>
                {employees.map((employee) => (
                  <div key={employee.code} className='employee-row' onClick={() => handleEmployeeClick(employee.code)}>
                    <i className={selectedEmployeeCodes.includes(employee.code) ? 'bi bi-check-circle-fill checkIcon' : 'bi bi-circle'}></i>
                    <p>{employee.code}</p>
                    <p>{employee.name}</p>
                  </div>
                ))}
                <button className='btnGeneratePayroll' onClick={()=>generatePayroll()}> Generate Payroll </button>
                <iframe ref={iframeRef} src={payrollURL} />
            </div>
        </div>
      </div>
      <div className='overlay' style={{display: showPopup? "block":"none"}} onClick={()=>setShowPopUp(false)}></div>
      <div className='popup' style={{display: showPopup? "block":"none"}}>
            <h2>{name}</h2>
            <p id="date"> {formatDate(date)} </p>
            <div className='hours'>
                <div>
                    <p><i className="bi bi-clock clockIcon"></i>  Signed In</p>
                    <input type='time' value={signIn} onChange={(e)=>setSignIn(e.target.value)}></input>
                </div>
                <div>
                    <p><i className="bi bi-clock clockIcon"></i>  Signed Out</p>
                    <input type='time' value={signOut} onChange={(e)=>setSignOut(e.target.value)}></input>
                </div>
            </div>
            <div className='totals'>
                <p><b> Reg Hours: </b> {parseFloat(regHours).toFixed(2)} </p>
                <p><b> O.T Hours: </b> {parseFloat(otHours).toFixed(2)} </p>
            </div>

            <button onClick={()=>saveNewHours(id)}> Update</button>


      </div>
    </div>
  )
}

export default Payroll