import React from 'react'
import { Link } from "react-router-dom"
import { PUBLIC_BASE } from '../../config'
export default function BagItems({ item, deleteBagItem, userEmail }) {
  const id = item._id
  return (
    <>
      <div className='orders'>
        <button className="orderDeleteBtn" onClick={() => { deleteBagItem(id, userEmail) }}>X</button>
        <Link to={`/buy/${item.productType}/${item._id}`} className="links">
          <div className="ordersLeft">
            <img className='imageLeft' src={PUBLIC_BASE + "/images/" + item.img[0]} />
          </div>
        </Link>
        <div className="ordersRight">
          <p className='orderBrandName'>{item.brandName}</p>
          <p className='orderDesc'>{item.aboutProductShort}</p>
          <p className='orderCompanyName'>SOLD BY: {item.companyName}</p>
          <div className='selectSizeCont'>
            <select className='select'>
              <option disabled selected hidden>Size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <select className='select'>
              <option disabled selected hidden>Qty</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          <div className="priceContainer">
            <h4 className='bagPrice'>₹ {item.sellingPrice}</h4>
            <div className='priceContainerMrp'>
              <h4 className='MRP'>MRP</h4>
              <h4 className='mainPrice'> ₹{item.mrp}</h4>
            </div>
            <h4 className='productDiscount'>({item.discount} % OFF)</h4>
          </div>
        </div>
      </div>
    </>
  )
}
