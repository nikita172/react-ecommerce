import axios from 'axios'
import React from 'react'
import "./leftBarPosts.css"
export default function LeftBarPosts({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const deleteItem = async () => {
        try {
            const res = await axios.delete("/admin/delete/" + post._id)
            window.location.reload(true)
        } catch (err) {
            console.log(err)
        }

    }
    const image = post.img[0];
    return (
        <div className="showProducts">
            <div className="productHead products">
                <img className="productImg" src={image && PF + image} />
                <button className="deleteBtn" type='button' onClick={deleteItem}>Delete</button>
            </div>
            <div className='brandName products'>
                <span className="productsHeading">
                    Brand name :
                </span>
                <span>
                    {post.brandName}
                </span>
            </div>
            <div className='price products'>
                <span className="productsHeading">
                    Price :
                </span>
                <span>
                    {post.price} Rs
                </span>
            </div>
            <div className='discount products'>
                <span className="productsHeading">
                    Discount :
                </span>
                <span>
                    {post.discount} %
                </span>
            </div>

            <div className='productType products'>
                <span className="productsHeading">
                    For :
                </span>
                <span>
                    {post.productType}
                </span>
            </div>
            <div className='desc products'>
                <span className="productsHeading">
                    About :
                </span>
                <span>
                    {post.aboutBrand}
                </span>
            </div>
            <div className='quantity products'>
                <span className="productsHeading">
                    Quantity :
                </span>
                <span>
                    {post.quantity}
                </span>
            </div>


        </div>


    )
}
