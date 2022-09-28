import React from 'react'
import "./loginHeader.css"
import {Link} from "react-router-dom"
export default function LoginHeader() {
  return (
    <div className="header">
        <img className="headerLogo" src="/assets/fastShop.jpg"/>
        <Link to="/register" >
        <button className='registerBtn' > Wanna Register ?</button>
        </Link>
        
       

    </div>
  )
}
