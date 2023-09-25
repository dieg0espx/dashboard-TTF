import React, { useEffect, useState } from 'react'

function FormNewJobsite(props) {
    const [randomNumber, setRandomNumber] = useState()
    const [jobsites, setJobsites] = useState([])

    const [company, setCompany] = useState()
    const [jobsite, setJobsite] = useState()
    const [contact, setContact] = useState()
    const [tel, setTel] = useState()

    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    useEffect(()=>{
        fetch(apiURL + '/getJobsites.php')
        .then(response => response.json())
        .then(response => {
            const sortedJobsites = response.sort((a, b) => a.companyName.localeCompare(b.companyName));
            setJobsites(sortedJobsites);
          });
          generateRandomNumber()
    },[props.load])

    function generateRandomNumber(){
        const min = 1000;
        const max = 9999;
        let codeFound = true;
        let newCode;
        while(codeFound){
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          for(let i = 0; i < jobsites.length; i++){
            if(randomNum == jobsites[i].code){
              break;
            }
          } 
          codeFound = false;
          newCode = randomNum
        }
        setRandomNumber(newCode)
    }

    function saveNewJobsite(){
        const data = {code:randomNumber, company, jobsite, contact, tel};
        const jsonString = JSON.stringify(data);
        fetch( apiURL + '/newJobsite.php?data=' + jsonString)
        .then(response => response.json())
        .then(response => console.log(response))

        setCompany('')
        setJobsite('')
        setContact('')
        setTel('')
        alert("New Jobsite added successfully !")
        window.location.reload();
    }


  return (
    <div className='form-newAutocomplete'>
        <input type='text' value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Company Name'/>
        <input type='text' value={jobsite} onChange={(e)=>setJobsite(e.target.value)} placeholder='Jobsite'/>
        <input type='text' value={contact} onChange={(e)=>setContact(e.target.value)} placeholder='Contact'/>
        <input type='text' value={tel} onChange={(e)=>setTel(e.target.value)} placeholder='Tel'/>
        <h3> {randomNumber} </h3>
        <button onClick={()=>saveNewJobsite()}> Save </button>
    </div>
  )
}

export default FormNewJobsite
