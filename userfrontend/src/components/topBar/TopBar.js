import React from 'react'
import "./topBar.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Search, PermIdentity, FavoriteBorder, LocalMallOutlined } from '@material-ui/icons';
export default function TopBar({ products, setProducts, type = "all" }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
  const userEmail = user[1]
  const [name, setName] = useState({});
  const closeMenuHandler = () => {
    setOpenModal(false)
  }
  useEffect(() => {
    document.addEventListener("click", closeMenuHandler)
    return () => { document.removeEventListener("click", closeMenuHandler) }
  }, [])
  useEffect(() => {
    const fetchUsername = async () => {
      const res = await axios.get(`/user/username/${userEmail}`)
      setName(res.data);
    }
    fetchUsername()
  }, [])
  const isWishlist = window.location.pathname.search("wishlist") > -1;
  useEffect(() => {
    const fetchSearchItem = async () => {
      if (isWishlist) {
        return
      }
      if (searchTerm.length != 0) {
        const res = await axios.get(`/user/search/${type}/${searchTerm}`)
        setProducts(res.data);
      } else {
        const res = await axios.get(`/admin/${type.toLowerCase()}/products`)
        setProducts(res.data)
      }
    }
    fetchSearchItem()
  }, [searchTerm])
  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload(true)
  }
  const openProfile = (e) => {
    e.stopPropagation()
    setOpenModal(!openModal)
  }
  return (
    <div className='topBarContainer'>
      <div className="topBarWrapper">
        <div className="logoBar">
          <img className="logo" src="/assets/fastShop.jpg" alt='logo' />
        </div>
        <div className="navBar">
          <Link to="/men" className='categories'>MEN</Link>
          <Link to="/women" className='categories'>WOMEN</Link>
          <Link to="/kid" className='categories'>KIDS</Link>
          <Link to="/beauty" className='categories'>BEAUTY</Link>
          <Link to="/homeandliving" className='categories'>HOME & LIVING</Link>
        </div>
        {isWishlist ? null :
          <div className="searchBar">
            <Search />
            <input className='search' type="text"
              placeholder='Search for products, brands and more'
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSearchTerm(e.target.value)
                }
              }} />
          </div>}
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
        <div onClick={(e) => e.stopPropagation()} className={openModal ? "profileContainer" : "hide"}>
          <p className='helloTag'>Hello {name && name.userName} !</p>
          <ul className='profileItems'>
            <Link to="/orders" className="links" style={{ color: "black" }}>
              <li className='listItem'>Orders</li>
            </Link>
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
