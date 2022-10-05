import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import LeftBar from "../../components/leftBar/LeftBar"
import axios from "axios";
import { useEffect, useState } from 'react'
import RightBar from "../../components/rightBar/RightBar"
export default function KidCloset() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const kid = "Kid"
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/admin/kid/products")
      const data = await res.data;
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])
  return (
    <>
      <TopBar products={products} setProducts={setProducts} type={kid} />
      <div className='menClosetContainer'>
        <LeftBar setProducts={setProducts} products={products} type={kid} loading={loading} setLoading={setLoading} />
        <RightBar loading={loading} products={products} setProducts={setProducts} setLoading={setLoading} />
      </div>
    </>
  )
}