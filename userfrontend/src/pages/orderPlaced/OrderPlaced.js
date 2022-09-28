import React from 'react'
import {Link} from "react-router-dom"
import "./orderPlaced.css"
import {CheckCircleOutline} from '@material-ui/icons';
export default function OrderPlaced() {
  return (
    <div className='emptyBar'>
          <div className="empty">
          <CheckCircleOutline style={{ color: "rgb(7, 199, 7)", fontSize: "150px" }} />
          <p className='orderPlaced'>Order Placed !</p>
            <Link className="links" to="/">
            <button className='goToHomeBtn'>RETURN TO HOME </button>
            </Link>
      </div>
      </div>
  )
}
