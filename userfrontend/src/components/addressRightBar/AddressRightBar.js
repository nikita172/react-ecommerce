import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { CircularProgress } from "@material-ui/core"
export default function AddressRightBar({ bagItem, form, email, setShowOrderPlaced }) {
  const [fetching, isFetching] = useState(false)
  const products = [];
  let totalMrp = 0;
  let totalDiscount = 0;
  let totalPrice = 0;
  for (let i = 0; i < bagItem.length; i++) {
    totalMrp += bagItem[i].mrp;
    totalPrice += bagItem[i].sellingPrices
    products.push(bagItem[i]._id)
  }
  totalDiscount = totalMrp - totalPrice
  const handleSubmit = async () => {
    const addressId = new FormData(form.current).get("add")
    const prodIds = bagItem.map(item => item._id)
    isFetching(true)
    const res = await axios.post("/user/addorders", {
      addressId: addressId,
      productIds: prodIds,
      email: email
    })
    isFetching(false)
    if (res.data.status) {
      const data = await axios.delete(`/delete/cart/${prodIds}/${email}`)
      setShowOrderPlaced(true)
    }
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
        <button className='placeOrderBtn' onClick={handleSubmit}>{fetching ? <CircularProgress size="12px" color="white" /> : "PLACE ORDER"}</button>
      </div>
    </div>
  )
}