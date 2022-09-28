import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import LeftBar from "../../components/leftBar/LeftBar"
import RightBar from "../../components/rightBar/RightBar"
import axios from "axios";
import { useEffect, useState } from 'react'
import "./menCloset.css"
export default function MenCloset() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const men="Men";
    useEffect(() => {
        const fetchProducts = async () => {          
            const res = await axios.get("/admin/men/products")
            const data = await res.data;
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
    }, [])
  console.log(products)
  
    return (
        <>
            
            <TopBar products={products} setProducts={setProducts} type={men}/>
            <div className='menClosetContainer'>
                <LeftBar setProducts={setProducts} products={products} type={men} />
                <RightBar loading={loading} products={products} />

            </div>


        </>
    )
}

