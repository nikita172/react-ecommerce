import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import LeftBar from "../../components/leftBar/LeftBar"
import RightBar from "../../components/rightBar/RightBar"
import { useEffect, useState } from 'react'
import axios from "axios";
export default function BeautyCloset() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const beauty = "Beauty"
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/admin/beauty/products")
      const data = await res.data;
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])
  return (
    <>
      <TopBar products={products} setProducts={setProducts} type={beauty} />
      <div className='menClosetContainer' style={{ display: "flex", flexDirection: "column" }}>
        <div className='leftBarContainer' >
          <div className="leftBarWrapper">
            <div className="itemTitle">
              {beauty} Products
              <p> - {products && products.length} items</p>
            </div>
          </div>
        </div>
        <RightBar loading={loading} products={products} setProducts={setProducts} />

      </div>


    </>
  )
}
