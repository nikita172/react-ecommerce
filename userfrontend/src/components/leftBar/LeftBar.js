import React from 'react'
import "./leftBar.css"
import axios from "axios";
import { useEffect, useState } from 'react'

export default function LeftBar({ products,type, setProducts }) {
    const [brands, setBrands] = useState([])

    const [filterProducts, setFilterProducts] = useState([])

console.log(brands)
  useEffect(()=>{
        const filterProducts = async()=>{
            const params= new URLSearchParams();
            params.append("brand", brands)
            console.log(params.toString())
            const res = await axios.get(`/admin/men/products/filter/?` + params);
            setProducts(res.data)
        }
        filterProducts()
    },[brands]) 
    return (
        <div className='leftBarContainer'>
            <div className="leftBarWrapper">

                <div className="itemTitle">
                    {type} Products
                    <p> - {products && products.length} items</p>
                </div>
                <div className="filterContainer">
                    <h5 className="filterTitle">
                        FILTERS
                    </h5>
                    <div className='filterItems'>
                        <div className="filterItem">
                            <h4 className="categoriesTitle">
                                Top Brands
                            </h4>


                            <label className='labels' for="Roadster" onChange={(e) =>
                                brands && brands.includes("Roadster")
                                    ? setBrands(brands.filter(e => e != "Roadster"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name="Roadster" value="Roadster" />
                                Roadster
                            </label>


                            <label className='labels' for="Adidas" onChange={(e) =>
                                brands && brands.includes("Adidas")
                                    ? setBrands(brands.filter(e => e != "Adidas"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name="Adidas" value="Adidas" />
                                Adidas
                            </label>


                            <label className='labels' for="Puma" onChange={(e) =>
                                brands && brands.includes("Puma")
                                    ? setBrands(brands.filter(e => e != "Puma"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name='Puma' value="Puma" />
                                Puma
                            </label>


                            <label className='labels' for="Nike"  onChange={(e) =>
                                brands && brands.includes("Nike")
                                    ? setBrands(brands.filter(e => e != "Nike"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox"name='Nike' value="Nike" />
                                Nike
                            </label>


                            <label className='labels' for="HRX"  onChange={(e) =>
                                brands && brands.includes("HRX")
                                    ? setBrands(brands.filter(e => e != "HRX"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name="HRX" value="HRX" />
                                HRX
                            </label>
                        </div>
















                        <div className="filterItem">
                            <h4 className="categoriesTitle">
                                Color
                            </h4>
                            <label className='labels'>
                                <input type="checkbox" />
                                red
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                Kalt
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                Puma
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                Nike
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                HRX
                            </label>
                        </div>

                        <div className="filterItem">
                            <h4 className="categoriesTitle">
                                Brands
                            </h4>
                            <label className='labels' >
                                <input type="checkbox" />
                                Roadster
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                Kalt
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                Puma
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                Nike
                            </label>
                            <label className='labels'>
                                <input type="checkbox" />
                                HRX
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
