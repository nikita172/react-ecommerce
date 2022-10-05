import React from 'react'
import "./registerHeader.css"
import { Link } from "react-router-dom"
export default function RegisterHeader() {
  return (
    <div className="header">
      <img className="headerLogo" src="/assets/fastShop.jpg" />
      <Link to="/login" >
        <button className='registerBtn'> Wanna Login ?</button>
      </Link>
    </div>
  )
}
