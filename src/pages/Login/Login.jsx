import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signup } from '../../Firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'


const Login = () => {
  const [signState, setsignState]= useState("Sign In")
  const [ name, setName]= useState("");
  const [ email, setEmail]= useState("");
  const [ password, setpassword]= useState("");
  const [loading,setloading]=useState(false);

  const userauth = async(event)=>{
    event.preventDefault();
    setloading(true);
    if(signState==="Sign In"){
      await login (email, password);
    }else{
      await signup(name,email,password);
    }
    setloading(false);
  }
  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
    <div className="login-form">
      <h1>{signState}</h1>
      <form action="">
        {signState==='Sign Up'? <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}
         placeholder='your name' />:<></>}
       
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='your email' />
        <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='your password' />
        <button onClick={userauth} type='submit'>{signState} </button>
   <div className="form-help">
    <div className="remember">
      <input type="checkbox" name="" id="" />
      <label htmlFor="">Remeber Me</label>
    </div>
    <p>Need Help?</p>
   </div>
      </form>
      <div className="form-switch">

        {signState==='Sign In'?<p>New to NetFlix? <span onClick={()=>{setsignState("Sign Up")}}>Sign Up Now</span></p>
        :<p>Already have an account? <span onClick={()=>{setsignState("Sign In")}}>Sign In Now</span></p>}
        
        
      </div>
    </div>
    </div>
  )
}

export default Login
