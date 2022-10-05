import React from 'react'
import "./orders.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import OrderItems from "../../components/orderItems/OrderItems"
import { CircularProgress } from "@material-ui/core"
import HomeTopBar from '../../components/homeTopBar/HomeTopBar'
export default function Orders() {
    const [orders, setOrders] = useState([])
    const [fetching, isfetching] = useState(true)
    const userEmail = JSON.parse(localStorage.getItem('user'))
    const [change, setChange] = useState(false)
    const email = userEmail[1]
    useEffect(() => {
        const fetchOrders = async () => {
            isfetching(true)
            const res = await axios.get(`/user/fetch/orders/${email}`)
            setOrders(res.data)
            isfetching(false)
        }
        fetchOrders()
    }, [change, email])
    const handleDeleteClick = async (id) => {
        await axios.delete(`/user/delete/order/${id}`)
        setChange(!change)
    }
    return (
        <>
            <HomeTopBar />
            <div className='orderContainer orderLine'>
                {fetching ? <div className='loader'><CircularProgress /> </div> :
                    orders && orders.length != 0 ?
                        <div className="orderWrapper">
                            <div className='bagDetails'>
                                <div className="bagDetailWrapperLeft">
                                    <div className='bagDetailsLeft'>
                                        <p className='itemSelect'>YOUR ORDERS</p>
                                        {orders && orders.map((item) => (
                                            <OrderItems key={item._id} item={item} handleDeleteClick={handleDeleteClick} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className='orderEmpty' >
                            <div className='orderEmptyMsg'>
                                <p>Looks like you didn't order yet!</p>
                                <Link className='links' to="/">
                                    <button className='cancelOrderBtn'>GO TO HOME</button>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
