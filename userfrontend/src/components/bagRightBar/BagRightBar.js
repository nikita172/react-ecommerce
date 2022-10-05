import React from 'react'
import { Link } from "react-router-dom"
export default function ({ item }) {
  let totalMrp = 0;
  let totalDiscount = 0;
  let totalPrice = 0;
  for (let i = 0; i < item.length; i++) {
    totalMrp += item[i].mrp;
    totalPrice += item[i].sellingPrice
  }
  totalDiscount = totalMrp - totalPrice
  return (
    <div className="bagDetailWrapperRight">
      <div className='bagDetailsRight'>
        <h4 className='priceDetail'>PRICE DETAIL({item.length} items)</h4>
        <div className="totalMrp">
          <p>Total MRP</p>
          <p>₹ {totalMrp}</p>
        </div>
        <div className="totalDiscountMrp">
          <p>Discount on MRP</p>
          <p className='totalDiscount'>- ₹ {totalDiscount}</p>
        </div>
        <div className="totalAmount">
          <p>Total Amount</p>
          <p>₹ {totalPrice}</p>
        </div>
        <Link to="/checkout/address">
          <button className='placeOrderBtn'>PLACE ORDER</button>
        </Link>
      </div>
    </div >
  )
}
