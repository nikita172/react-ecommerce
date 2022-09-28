import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import "./wishList.css"
import axios from "axios"
import WishlistItem from '../../components/wishlistItem/WishlistItem'
  
export default function WishList() {
    const [change, setChange]=useState(0);
    const userDetails = JSON.parse(localStorage.getItem('user'));  
    const userEmail=userDetails[1]  
    const [wishlistItem , setWishlistItem] = useState([])
    useEffect(()=>{
        const fetchWishlist =async()=>{
            const res=await axios.get(`/user/wishlistitem/${userEmail}`)
            
            setWishlistItem(res.data)
            
        }
        fetchWishlist()
    },[change]
    )
    const deleteWishlistItem = async(id,userEmail)=>{       
        try{
            const res = await axios.put(`/user/delete/wishlistitem/${userEmail}`, {
                productId: id,
            });
            
            setChange(!change);
        }
        catch(err){
            console.log(err)
        }
    }  
    return (
        <div className='wishListConTainer'>
            <TopBar />
            <div className='wishlistWrapper'>
                { wishlistItem.length!=0 ? wishlistItem.map((w)=>(
                    <WishlistItem  key={w._id} item={w} deleteWishlist={deleteWishlistItem} change={change} setChange={setChange} userEmail={userEmail}/>
                )):<div className='emptydiv'>
                    <div className="emptyWishlist">
                    No items yet ! </div></div>}               
            </div>           
        </div>
    )
}
