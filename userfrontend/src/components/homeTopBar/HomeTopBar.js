import React from 'react'
import { Link } from "react-router-dom"
import { PermIdentity, FavoriteBorder, LocalMallOutlined } from '@material-ui/icons';
import {useEffect, useState} from "react"
import axios from "axios"
export default function HomeTopBar() {
    const [openModal , setOpenModal] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))
  const userEmail = user[1]
  const [name, setName] = useState({});
  useEffect(()=>{
    const fetchUsername = async()=>{
      const res = await axios.get(`/user/username/${userEmail}`)     
      setName(res.data);
    }   
    fetchUsername()
  },[])
  const handleLogout = ()=>{
    localStorage.clear()
    window.location.reload(true)
  }


  const openProfile = ()=>{
    setOpenModal(!openModal)


  }
    return (

        <div className='topBarContainer'>
            <div className="topBarWrapper">
                <div className="logoBar">
                    <img className="logo" src="/assets/fastShop.jpg" alt='logo' />
                </div>
                <div className="navBar">
                    <a href="/men" className='categories'>MEN</a>
                    <a href="/women" className='categories'>WOMEN</a>
                    <a href="/kid" className='categories'>KIDS</a>
                    <a href="/beauty" className='categories'>BEAUTY</a>
                    <a href="/homeandliving" className='categories'>HOME & LIVING</a>
                </div>

                
                <div className="shopContainer">


                    <div className="userInfoLink"  >
                        <button className="userInfoLink profile" type="button" onClick={openProfile}>
                            <PermIdentity />
                            <span>Profile</span>
                        </button>

                    </div>



                    <Link to="/wishlist" className='links'>
                        <div className="userInfoLink">
                            <FavoriteBorder />
                            <span>Wishlist</span>
                        </div>
                    </Link>

                    <Link to="/checkout/cart" className='links'>
                        <div className="userInfoLink">
                            <LocalMallOutlined />
                            <span>Bag</span>
                        </div>
                    </Link>

                </div>

                <div className={openModal ? "profileContainer" : "hide"}>

                    <p className='helloTag'>Hello {name && name.userName} !</p>
                    <ul className='profileItems'>
                        <li className='listItem'>Orders</li>

                        <Link to="/wishlist" style={{ textDecoration: "none", color: "black" }}>
                            <li className='listItem'>Wishlist</li>
                        </Link>

                        <Link to="/checkout/cart" style={{ textDecoration: "none", color: "black" }}>
                            <li className='listItem'>Cart</li>
                        </Link>
                        <li className='listItem'>
                            <button className='logoutBtn' onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}
