import React from 'react'
import "./rightBar.css"
import { CircularProgress } from "@material-ui/core"
import ShowProducts from '../showProducts/ShowProducts';
import { useState, useEffect } from "react"
export default function RightBar({ loading, products, setProducts, setLoading }) {
    const sorting = ((arrSort) => {
        if (arrSort === "lowtohigh") {
            setProducts((products) => [...products.sort((a, b) => (a.sellingPrice - b.sellingPrice))])
        }
        else if (arrSort === "hightolow") {
            setProducts((products) => [...products.sort((a, b) => (b.sellingPrice - a.sellingPrice))])
        }
    })
    return (
        <div className='rightBarContainer'>
            <div className="rightBarWrapper">
                <div className="sortBySection">
                    <label htmlFor='sortBy' >
                        <select name="sortBy" className='sortBy' onChange={(e) => sorting(e.target.value)}>
                            <option value="" selected hidden>Sort by : Price</option>
                            <option value="lowtohigh">Low-To-High</option>
                            <option value="hightolow">High-To-Low</option>
                        </select>
                    </label>
                </div>
                <div className="itemsShowcase">
                    {loading ? <div className='closetLoader'>
                        <CircularProgress color="white" size="20px" />
                    </div>
                        :
                        products && products.length != 0 ? products.map((p) => (
                            <ShowProducts key={p._id} product={p} type="men" />
                        )) : <div className='emptyMsg'>No items yet !</div>
                    }
                </div>
            </div>
        </div>
    )
}
