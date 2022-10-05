import React from 'react'
import { PUBLIC_BASE } from '../../config'
import "./orderItems.css"
export default function OrderItems({ item, handleDeleteClick }) {
    return (
        <div className='orders'>
            <div className="ordersLeft">
                <img className='imageLeft' src={PUBLIC_BASE + "/images/" + item.productsId.img[0]} />
            </div>
            <div className="ordersRight">
                <p className='orderBrandName'>{item.productsId.brandName}</p>
                <p className='orderDesc'>{item.productsId.aboutProductShort}</p>
                <p className='orderCompanyName'>SOLD BY: {item.productsId.companyName}</p>
                <div className="priceContainer">
                    <h4 className='bagPrice'>₹ {item.productsId.sellingPrice}</h4>
                    <div className='priceContainerMrp'>
                        <h4 className='MRP'>MRP</h4>
                        <h4 className='mainPrice'> ₹ {item.productsId.mrp}</h4>
                    </div>
                    <h4 className='productDiscount'>({item.productsId.discount} % OFF)</h4>
                </div>
                <button className="cancelOrderBtn" onClick={() => handleDeleteClick(item._id)}>CANCEL</button>
            </div>
        </div>
    )
}
