import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import LeftBar from "../../components/leftBar/LeftBar"
import axios from "axios";
import { useEffect, useState } from 'react'
import RightBar from "../../components/rightBar/RightBar"
export default function HomeLivingCloset() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const homeLiving = "HomeLiving"
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/admin/homeliving/products")
      const data = await res.data;
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])
  return (
    <>

      <TopBar products={products} setProducts={setProducts} type={homeLiving} />
      <div className='menClosetContainer' style={{ display: "flex", flexDirection: "column" }}>
        <div className='leftBarContainer' >
          <div className="leftBarWrapper">
            <div className="itemTitle">
              {homeLiving} Products
              <p> - {products && products.length} items</p>
            </div>
          </div>
        </div>

        <RightBar loading={loading} products={products} setProducts={setProducts} />

      </div>


    </>
  )
}
