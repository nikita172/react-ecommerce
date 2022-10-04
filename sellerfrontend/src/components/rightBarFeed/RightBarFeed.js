import React from 'react'
import "./rightBarFeed.css"
import axios from "axios";
import { useState } from "react"
export default function RightBarFeed({ productOpen, setProductOpen }) {

    const [categories, setCategories] = useState("")
    const size = !(categories === "HomeLiving" || categories === "Beauty")
    const closeProductDetail = () => {
        if (productOpen === true) {
            setProductOpen(false)
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userEmail = JSON.parse(localStorage.getItem('user'))
        formData.append("email", userEmail[1])

        try {
            await axios.post("/admin/product", formData)
            window.location.reload(true)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='rightBarFeedContainer'>
            <div className='productDetail'>
                <form id="productDetailform" onSubmit={handleSubmitForm} encType="multipart/form-data">
                    <div className="header">
                        <h3 className='productDetailheading'>Enter Product Details</h3>
                        <button type="button" onClick={closeProductDetail} className="crossButton">X</button>
                    </div>


                    <div className="productType">
                        <h5>Select Category*</h5>
                        <div className="details">
                            <select name="productType" id="productType" className="userDetail " required onChange={(e) => setCategories(e.target.value)}>
                                <option value="" disabled selected hidden>Select Product Type</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kid">Kid</option>
                                <option value="Beauty">Beauty</option>
                                <option value="HomeLiving">Home & Living</option>


                            </select>
                        </div>
                    </div>
                    <div className="brandName">
                        <h5>Brand Name*</h5>
                        <input className='productInputs' type="text" name="brandName" placeholder="Brand Name" required />
                    </div>
                    <div className="companyName">
                        <h5>Company Name*</h5>
                        <input className='productInputs' type="text" name="companyName" placeholder="Company Name" required />
                    </div>



                    <div className="desc">
                        <h5>About Product*</h5>
                        <input className='productInputs' maxLength="50" type="text" name="aboutProductShort" placeholder="Desc" required />
                    </div>

                    <div className="longDesc">
                        <h5>More Detail About Product*</h5>
                        <input className='productInputs' type="text" name="aboutProductLong" placeholder="More Desc" required />
                    </div>

                    <div className={size ? "sizes" : "hideSize"}  >
                        <h5>Sizes*</h5>
                        <div className='sizeBox'>
                            <p className='size'>Product of S Size</p>
                            <input className='productInputs sizeInput' type="number" name="sizesQuan" placeholder="S Size" />
                            <p className='size'>Product of M Size</p>
                            <input className='productInputs sizeInput' type="number" name="sizesQuan" placeholder="M Size" />
                            <p className='size'>Product of L Size</p>
                            <input className='productInputs sizeInput' type="number" name="sizesQuan" placeholder="L Size" />
                            <p className='size'>Product of  XL Size</p>
                            <input className='productInputs sizeInput' type="number" name="sizesQuan" placeholder="XL Size" />
                        </div>
                    </div>


                    <div className="style">
                        <h5>Style*</h5>
                        <input className='productInputs' type="text" name="style" placeholder="Style" required />
                    </div>

                    <div className="sleeve">
                        <h5>Sleeve*</h5>
                        <input className='productInputs' type="text" name="sleeve" placeholder="Sleeve" required />
                    </div>

                    <div className="colour">
                        <h5>Colour*</h5>
                        <input className='productInputs' type="text" name="color" placeholder="Colour" required />
                    </div>

                    <div className="print">
                        <h5>Print*</h5>
                        <input className='productInputs' type="text" name="print" placeholder="Print" required />
                    </div>
                    <div className="fit">
                        <h5>Fit*</h5>
                        <input className='productInputs' type="text" name="fit" placeholder="Fit" required />
                    </div>

                    <div className="SizeAndFit">
                        <h5>Size And Fit*</h5>
                        <input className='productInputs' type="text" name="sizeAndFit" placeholder="Size And Fit" required />
                    </div>

                    <div className="material">
                        <h5>Material And Care*</h5>
                        <input className='productInputs' type="text" name="materialAndCare" placeholder="Material And Care" required />
                    </div>

                    <div className="actualPrice">
                        <h5>MRP*</h5>
                        <input className='productInputs' type="number" name="mrp" placeholder="Price" required />
                    </div>

                    <div className="discount">
                        <h5>Discount in %*</h5>
                        <input className='productInputs' type="number" name="discount" placeholder="Discount" required />
                    </div>
                    <div className="sellingPrice">
                        <h5>Selling Price*</h5>
                        <input className='productInputs' type="number" name="sellingPrice" placeholder="Selling Price" required />
                    </div>



                    <div className="addPhotos" >
                        <h5>Add Photos of Product*</h5>
                        <input type="file" name="file[]" required accept=".jpeg, .png, .jpg ,.avif , .webp, .jfif"
                        />
                        <input type="file" name="file[]" accept=".jpeg, .png, .jpg ,.avif , .webp , .jfif"
                        />
                        <input type="file" name="file[]" accept=".jpeg, .png, .jpg ,.avif , .webp , .jfif"
                        />
                        <input type="file" name="file[]" accept=".jpeg, .png, .jpg ,.avif , .webp , .jfif"
                        />
                        <input type="file" name="file[]" accept=".jpeg, .png, .jpg ,.avif , .webp , .jfif"
                        />

                    </div>
                    <button id="addButton" type="submit">Add</button>
                </form>

            </div>
        </div>
    )
}
