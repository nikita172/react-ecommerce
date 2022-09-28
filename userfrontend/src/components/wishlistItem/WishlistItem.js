import React from 'react'
import axios from "axios"
import { useState } from "react"
import ErrorMsg from "../errorMsg/ErrorMsg"
export default function WishlistItem({ item, deleteWishlist, userEmail, change, setChange }) {
    const [msg, setMsg] = useState("")
    const [isMsg, setIsMsg] = useState(false)
    const addToBag = async () => {
        try {
            const res = await axios.put(`/user/movetobag/${userEmail}`, {
                productId: item._id,
            });
            setMsg(res.data)
            setIsMsg(true)
            setTimeout(() => {
                setIsMsg(false)
            }, 2000)
            
            setChange(!change)
        }
        catch (err) {
            console.log(err)
        }
    }
    const id = item._id
    return (
        <>
        <div className="wishListProducts">
            <img className='wishListProductImg' alt="productImg" src={`http://localhost:8080/images/${item.img[0]}`} />
            <button className='removeBtn' onClick={() => { deleteWishlist(id, userEmail) }}>X</button>
            <p className="wishListDesc">
                {item.aboutProductShort}
            </p>
            <p className='wishListPrice'>₹ {item.sellingPrice}</p>
            <button className='movetobagBtn' onClick={addToBag}>MOVE TO BAG</button>
           
        </div>
        {isMsg ? <ErrorMsg error={msg} /> : null}
        </>

    )
}
