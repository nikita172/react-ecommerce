import React from 'react'
import "./bag.css"
import { useState, useEffect } from "react"
import BagTopBar from '../../components/bagTopBar/BagTopBar'
import BagRightBar from '../../components/bagRightBar/BagRightBar'
import axios from "axios"
import BagItems from '../../components/bagItems/BagItems'
import { LocalMallOutlined } from '@material-ui/icons';
import { Link } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
export default function Bag() {
  const [bagItem, setBagItem] = useState([])
  const [change, setChange] = useState(false)
  const [fetching, isFetching] = useState(true)
  const user = JSON.parse(localStorage.getItem("user"))
  const userEmail = user[1]
  useEffect(() => {

    const fetchBag = async () => {
      isFetching(true)
      const res = await axios.get(`/user/bagitem/${userEmail}`)
      setBagItem(res.data)
      isFetching(false)
    }
    fetchBag()
  }, [change]
  )


  const deleteBagItem = async (id, userEmail) => {
    isFetching(true)
    try {
      const res = await axios.put(`/user/delete/bagitem/${userEmail}`, {
        productId: id,
      });
      isFetching(false)
      setChange(!change);
    }
    catch (err) {
      console.log(err)
    }
  }
  console.log(bagItem)
  return (
    <div className='bagContainer'>
      <BagTopBar />
      {bagItem.length != 0 ?
        <div className='bagDetails'>
          <div className="bagDetailWrapperLeft">
            <div className='bagDetailsLeft'>
              <p className='itemSelect'>{bagItem.length} ITEMS SELECTED</p>

              {bagItem && bagItem.map((item) => (
                <BagItems key={item._id} item={item} deleteBagItem={deleteBagItem} userEmail={userEmail} />
              ))}
            </div>
          </div>
          <BagRightBar item={bagItem} />
        </div>
        :
        fetching ? <div className='loader'><CircularProgress /> </div> : <div className='emptyBar'>
          <div className="empty">
            <LocalMallOutlined style={{ fontSize: "90px", color: "#Ff3366", fontWeight: "400" }} />
            <Link className="links" to="/wishlist">
              <button className='bagSectionBtn'>ADD ITEMS FROM WISHLIST</button>
            </Link>
          </div>


        </div>}
    </div>
  )
}
