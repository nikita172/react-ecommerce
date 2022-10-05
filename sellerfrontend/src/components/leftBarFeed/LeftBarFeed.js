import axios from 'axios'
import { CircularProgress } from "@material-ui/core"
import React, { useEffect, useState } from 'react'
import "./leftBarFeed.css"
import LeftBarPosts from "../leftBarPosts/LeftBarPosts"
export default function LeftBarFeed() {
    const [isFetching, setIsFetching] = useState(false)
    const [products, setProducts] = useState([]);
    let email = JSON.parse(localStorage.getItem('admin'))
    useEffect(() => {
        const fetchProducts = async () => {
            setIsFetching(true)
            const res = await axios.get("/admin/" + email[1]);
            setProducts(res.data)
            setIsFetching(false)
        }
        fetchProducts()
    }, [email[1]])

    return (
        <div className='leftBarFeedContainer'>
            <div className='leftBarWrapper'>
                {isFetching
                    ? <CircularProgress color="white" size="30px" />
                    : products === "No Product yet !" ? <div className='noProduct'>No Product yet !</div>
                        : products.map((p) => (
                            <LeftBarPosts key={p._id} post={p} />
                        ))}
            </div>
        </div>
    )
}
