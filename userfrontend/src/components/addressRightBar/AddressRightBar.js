import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"
export default function AddressRightBar({ bagItem, form }) {

  const products = [];
  let totalMrp = 0;
  let totalDiscount = 0;
  let totalPrice = 0;
  for (let i = 0; i < bagItem.length; i++) {
    totalMrp += bagItem[i].mrp;
    totalPrice += bagItem[i].sellingPrice
    products.push(bagItem[i]._id)
  }
  totalDiscount = totalMrp - totalPrice

  const handleSubmit = () => {
    const addressId = new FormData(form.current).get("add")
    console.log(addressId)
  }
  return (
    <div className="bagDetailWrapperRight">
      <div className='bagDetailsRight'>
        <h4 className='priceDetail'>PRICE DETAIL({bagItem.length} items)</h4>
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
        
        <button className='placeOrderBtn' onClick={handleSubmit}>PLACE ORDER</button>
       
      </div>
    </div>
  )
}
