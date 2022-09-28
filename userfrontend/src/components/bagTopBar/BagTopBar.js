import React from 'react'
import "./bagTopBar.css"
import { VerifiedUser } from '@material-ui/icons'
import {useParams} from "react-router-dom"
export default function BagTopBar() {
  const params = useParams().cart
  return (
    <div className="bagTopContainer">
        <div className="bagTop">
          <div className='bagTopLeft'>
            <img className="logo" src="/assets/fastShop.jpg" alt='logo' />
          </div>
          <div className='bagTopMiddle'>
            <p className={params=="cart" ? "decor": ""}>BAG</p>
            <p>------</p>
              <p className={params=="address" ? "decor": ""}>ADDRESS & PAYMENT</p>
          </div>
          <div className='bagTopRight'>

            <VerifiedUser style={{ color: "rgb(7, 199, 7)", fontSize: "35px" }} />
            <p> 100% SECURE</p>
          </div>

        </div>

        <div className="bagDetails">

        </div>


      </div>
  )
}
