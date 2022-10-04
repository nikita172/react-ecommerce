import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import "./wishList.css"
import axios from "axios"
import { CircularProgress } from "@material-ui/core"
import WishlistItem from '../../components/wishlistItem/WishlistItem'

export default function WishList() {
    const [fetching, isFetching] = useState(true)
    const [change, setChange] = useState(0);
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const userEmail = userDetails[1]
    const [wishlistItem, setWishlistItem] = useState([])
    useEffect(() => {
        const fetchWishlist = async () => {
            isFetching(true)
            const res = await axios.get(`/user/wishlistitem/${userEmail}`)

            setWishlistItem(res.data)
            isFetching(false)
        }
        fetchWishlist()
    }, [change]
    )
    const deleteWishlistItem = async (id, userEmail) => {
        try {
            isFetching(true)
            const res = await axios.put(`/user/delete/wishlistitem/${userEmail}`, {
                productId: id,
            });

            setChange(!change);
            isFetching(false)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='wishListConTainer'>
            <TopBar />
            <div className='wishlistWrapper'>
                {wishlistItem.length != 0 ? wishlistItem.map((w) => (
                    <WishlistItem key={w._id} item={w} deleteWishlist={deleteWishlistItem} change={change} setChange={setChange} userEmail={userEmail} />
                )) :
                    fetching ? <div className='loader'><CircularProgress /> </div> :
                        <div className='emptydiv'>
                            <div className="emptyWishlist">
                                No items in the WishList ! </div></div>}
            </div>
        </div>
    )
}
