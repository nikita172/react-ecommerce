import React, { useEffect, useState } from 'react'
import "./mainBar.css"
import axios from "axios"
import HomeProducts from '../homeProducts/HomeProducts'
import { Link } from 'react-router-dom'
import { CircularProgress } from "@material-ui/core"
export default function MainBar() {
    const [loading, setLoading] = useState(false)

    const [menProducts, setMenProducts] = useState([])
    const [womenProducts, setWomenProducts] = useState([])
    const [kidProducts, setKidProducts] = useState([])
    const [beautyProducts, setBeautyProducts] = useState([])
    const [homeLivingProducts, setHomeLivingProducts] = useState([])
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    let arr5 = [];

    if (menProducts.length > 6) {
        for (let i = 0; i < 6; i++) {
            arr.push(menProducts[i])
        }
        setMenProducts(arr)
    }
    if (womenProducts.length > 6) {
        for (let i = 0; i < 6; i++) {
            arr2.push(womenProducts[i])
        }
        setWomenProducts(arr2)
    }
    if (kidProducts.length > 6) {
        for (let i = 0; i < 6; i++) {
            arr3.push(kidProducts[i])
        }
        setKidProducts(arr3)
    }
    if (beautyProducts.length > 6) {
        for (let i = 0; i < 6; i++) {
            arr4.push(setBeautyProducts[i])
        }
        setBeautyProducts(arr4)
    }
    if (homeLivingProducts.length > 6) {
        for (let i = 0; i < 6; i++) {
            arr5.push(homeLivingProducts[i])
        }
        setHomeLivingProducts(arr5)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            const menPro = await axios.get("/admin/men/products")
            const womenPro = await axios.get("/admin/women/products")
            const kidPro = await axios.get("/admin/kid/products")
            const beautyPro = await axios.get("/admin/beauty/products")
            const homeLivingPro = await axios.get("/admin/homeliving/products")
            const menData = await menPro.data;
            const womenData = await womenPro.data;
            const kidData = await kidPro.data;
            const beautyData = await beautyPro.data;
            const homeLivingData = await homeLivingPro.data;

            setMenProducts(menData)
            setWomenProducts(womenData)
            setKidProducts(kidData)
            setBeautyProducts(beautyData)
            setHomeLivingProducts(homeLivingData)
            setLoading(false)


        }
        fetchProducts()
    }, [])


    return (
        <div className='mainBarContainer'>
            <div className="mainBarWrapper">
                <div className='bestOf'>
                    <div className='bestOfItems'>
                        <div className="headerTop">
                            <div className="headerLeft">
                                <h4 className='productDetails'>
                                    Best of Men
                                </h4>
                                <p className='productDetail'>
                                    Best of men
                                </p>
                            </div>
                            <div className='headerRight'>
                                <Link className="links" to="/men">

                                    <button className='viewAllBtn'>
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {loading ?
                            <div className='loaderHome'>
                                <CircularProgress color="white" size="20px" />
                            </div> :
                            <div className="headerBottom">
                                {menProducts && menProducts.map(men => (
                                    <HomeProducts key={men._id} product={men} />

                                ))
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className='bestOf'>
                    <div className='bestOfItems'>
                        <div className="headerTop">
                            <div className="headerLeft">
                                <h4 className='productDetails'>
                                    Best of Women
                                </h4>
                                <p className='productDetail'>
                                    Best of women
                                </p>
                            </div>
                            <div className='headerRight'>
                                <Link className="links" to="women">
                                    <button className='viewAllBtn'>
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {loading ?
                            <div className='loaderHome'>
                                <CircularProgress color="white" size="20px" />
                            </div> :
                            <div className="headerBottom">
                                {womenProducts && womenProducts.map(women => (
                                    <HomeProducts key={women._id} product={women} />

                                ))
                                }
                            </div>
                        }
                    </div>
                </div>



                <div className='bestOf'>
                    <div className='bestOfItems'>
                        <div className="headerTop">
                            <div className="headerLeft">
                                <h4 className='productDetails'>
                                    Best of Kids
                                </h4>
                                <p className='productDetail'>
                                    Best of kids
                                </p>
                            </div>
                            <div className='headerRight'>
                                <Link className="links" to="/kid">
                                    <button className='viewAllBtn'>
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {loading ?
                            <div className='loaderHome'>
                                <CircularProgress color="white" size="20px" />
                            </div> :
                            <div className="headerBottom">
                                {kidProducts && kidProducts.map(kid => (
                                    <HomeProducts key={kid._id} product={kid} />

                                ))
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className='bestOf'>
                    <div className='bestOfItems'>
                        <div className="headerTop">
                            <div className="headerLeft">
                                <h4 className='productDetails'>
                                    Best of Makeup and Beauty
                                </h4>
                                <p className='productDetail'>
                                    Best of makeup and beauty
                                </p>
                            </div>
                            <div className='headerRight'>
                                <Link className="links" to="beauty">
                                    <button className='viewAllBtn'>
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {loading ?
                            <div className='loaderHome'>
                                <CircularProgress color="white" size="20px" />
                            </div> :
                            <div className="headerBottom">
                                {beautyProducts && beautyProducts.map(beauty => (
                                    <HomeProducts key={beauty._id} product={beauty} />

                                ))
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className='bestOf lastCont'>
                    <div className='bestOfItems'>
                        <div className="headerTop">
                            <div className="headerLeft">
                                <h4 className='productDetails'>
                                    Best of Home & Living
                                </h4>
                                <p className='productDetail'>
                                    Best of home & living
                                </p>
                            </div>
                            <div className='headerRight'>
                                <Link className="links" to="homeandliving">
                                    <button className='viewAllBtn'>
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {loading ?
                            <div className='loaderHome'>
                                <CircularProgress color="white" size="20px" />
                            </div> :
                            <div className="headerBottom">
                                {homeLivingProducts && homeLivingProducts.map(data => (
                                    <HomeProducts key={data._id} product={data} />

                                ))
                                }
                            </div>
                        }
                    </div>
                </div>




            </div>
        </div>
    )
}
