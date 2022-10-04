import React from 'react'
import "./showProducts.css"
import { Link } from "react-router-dom"
export default function ShowProducts({ product, type }) {
  var image = product.img[0]
  return (
    <Link to={`/buy/${type}/${product._id}`} style={{ color: "rgba(14, 13, 13, 0.502)", textDecoration: "none" }} >

      <div className="products">
        <img className='productImg' alt="productImg" src={image && "http://localhost:8080/images/" + image} />
        <h4 className='brandName'>
          {product.brandName}
        </h4>
        <p className="desc">
          {product.aboutProductShort
          }
        </p>
        <p className='price'>₹ {product.sellingPrice}</p>
      </div>
    </Link>
  )
}
