import React from 'react'
import "./leftBar.css"
import axios from "axios";
import { useEffect, useState } from 'react'

export default function LeftBar({ products, type, setProducts, setLoading, loading }) {
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    useEffect(() => {
        const filterProducts = async () => {
            const params = new URLSearchParams();
            params.append("brand", brands)
            params.append("type", type)
            params.append("color", colors)

            setLoading(true)
            const res = await axios.get(`/admin/men/products/filter/?` + params);
            setProducts(res.data)
            setLoading(false)
        }
        filterProducts()
    }, [brands, colors])

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


                            <label className='labels' htmlFor="Roadster" onChange={(e) =>
                                brands && brands.includes("Roadster")
                                    ? setBrands(brands.filter(e => e != "Roadster"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name="Roadster" value="Roadster" />
                                Roadster
                            </label>


                            <label className='labels' htmlFor="Adidas" onChange={(e) =>
                                brands && brands.includes("Adidas")
                                    ? setBrands(brands.filter(e => e != "Adidas"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name="Adidas" value="Adidas" />
                                Adidas
                            </label>


                            <label className='labels' htmlFor="Puma" onChange={(e) =>
                                brands && brands.includes("Puma")
                                    ? setBrands(brands.filter(e => e != "Puma"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name='Puma' value="Puma" />
                                Puma
                            </label>


                            <label className='labels' htmlFor="Nike" onChange={(e) =>
                                brands && brands.includes("Nike")
                                    ? setBrands(brands.filter(e => e != "Nike"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name='Nike' value="Nike" />
                                Nike
                            </label>


                            <label className='labels' htmlFor="HRX" onChange={(e) =>
                                brands && brands.includes("HRX")
                                    ? setBrands(brands.filter(e => e != "HRX"))
                                    : setBrands([...brands, e.target.value])
                            }>
                                <input type="checkbox" name="HRX" value="HRX" />
                                HRX
                            </label>
                        </div>




                        <div className="filterItem">
                            <h4 className="categoriesTitle" >
                                Color
                            </h4>


                            <label className='labels' htmlFor="Red" onChange={(e) =>
                                colors && colors.includes("Red")
                                    ? setColors(colors.filter(e => e != "Red"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Red" value="Red" />
                                Red
                            </label>

                            <label className='labels' htmlFor="White" onChange={(e) =>
                                colors && colors.includes("White")
                                    ? setColors(colors.filter(e => e != "White"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="White" value="White" />
                                White
                            </label>

                            <label className='labels' htmlFor="Black" onChange={(e) =>
                                colors && colors.includes("Black")
                                    ? setColors(colors.filter(e => e != "Black"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Black" value="Black" />
                                Black
                            </label>

                            <label className='labels' htmlFor="Blue" onChange={(e) =>
                                colors && colors.includes("Blue")
                                    ? setColors(colors.filter(e => e != "Blue"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Blue" value="Blue" />
                                Blue
                            </label>

                            <label className='labels' htmlFor="Pink" onChange={(e) =>
                                colors && colors.includes("Pink")
                                    ? setColors(colors.filter(e => e != "Pink"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Pink" value="Pink" />
                                Pink
                            </label>

                            <label className='labels' htmlFor="Green" onChange={(e) =>
                                colors && colors.includes("Green")
                                    ? setColors(colors.filter(e => e != "Green"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Green" value="Green" />
                                Green
                            </label>

                            <label className='labels' htmlFor="Orange" onChange={(e) =>
                                colors && colors.includes("Orange")
                                    ? setColors(colors.filter(e => e != "Orange"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Orange" value="Orange" />
                                Orange
                            </label>
                            <label className='labels' htmlFor="Yellow" onChange={(e) =>
                                colors && colors.includes("Yellow")
                                    ? setColors(colors.filter(e => e != "Yellow"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Yellow" value="Yellow" />
                                Yellow
                            </label>

                            <label className='labels' htmlFor="Brown" onChange={(e) =>
                                colors && colors.includes("Brown")
                                    ? setColors(colors.filter(e => e != "Brown"))
                                    : setColors([...colors, e.target.value])}>
                                <input type="checkbox" name="Brown" value="Brown" />
                                Brown
                            </label>

                        </div>


                    </div>
                </div>
            </div>
        </div >
    )
}
