import React from 'react'
import "./homeProducts.css"
import { Link } from 'react-router-dom'
import { PUBLIC_BASE } from '../../config'
export default function HomeProducts({ product }) {
    const image = product.img[0]
    const type = product.productType.toLowerCase()
    return (
        <Link to={`buy/${type}/${product._id}`} className="links">
            <div className="headerBottomDetails">
                <img className="prodImg" src={image && PUBLIC_BASE + "/images/" + image} />
                <div className='productDesc'>
                    <h5>{product.aboutProductShort}</h5>
                    <p>Just for ₹ {product.sellingPrice}</p>
                    <p>{product.materialAndCare}</p>
                </div>
            </div>
        </Link>
    )
}
