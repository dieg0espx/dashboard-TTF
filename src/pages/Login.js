import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import logo from '../images/logo.png'

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    async function checkUser(){
        const data = {username, password};
        const jsonString = JSON.stringify(data);
        await fetch('https://api.ttfconstruction.com/checkUser.php?data=' + jsonString)
        .then(response => response.json())
        .then(response => {
            if(response.status == 200){
                Cookies.set('access', true, { expires: 1 / 1440 });
                window.location.reload()
            }else {
                alert("USER NOT FOUND :(")
                setPassword('')
            }
            console.log(response);
        })
    }

  return (
    <div className='wrapper-login'>
        <div className='content'>
            <img src={logo} />
            <input type='email' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type='password'placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={()=>checkUser()}> Access </button>
        </div>
    </div>
  )
}

export default Login