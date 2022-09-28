import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import "./previewProduct.css"
import { FavoriteBorder, LocalMallOutlined, Favorite ,ArrowForward} from '@material-ui/icons';


import axios from 'axios';
import { useParams } from 'react-router';
import ErrorMsg from '../../components/errorMsg/ErrorMsg';
export default function PreviewProduct() {
    const [isMsg, setIsMsg] = useState(false)
    const [isCartMsg, setIsCartMsg] = useState(false)


    const userDetail = JSON.parse(localStorage.getItem('user'))
    const email = userDetail[1]
    const id = useParams().id;
    const [wishlist, setWishlist] = useState(null)
    const [data, setData] = useState(null)
    const [isAdded, setIsAdded] = useState()

    const [cart, setCart] = useState(null)
    const [isCartAdded, setIsCartAdded] = useState()
    useEffect(() => {
        const renderProduct = async () => {
            let res = await axios.get("/admin/product/" + id)
            res = res.data
            setData(res)
        }
        renderProduct()
    }, [id])

    useEffect(() => {
        const render = async () => {
            try {
                const res = await axios.get(`/user/isaddtowishlist/${email}/${id}`);
                setIsAdded(res.data.status)
            } catch (err) {
                console.log(err);
            }
        }
        render()
    }, [wishlist])

    const addToWishlist = async () => {
        try {
            const res = await axios.put(`/user/addtowishlist/${email}`, {
                productId: id,
            });
            setIsAdded(res.data.status)
            setWishlist(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (wishlist) {
            setIsMsg(true)
            setTimeout(() => {
                setIsMsg(false)
            }, 2000)
        }
    }, [wishlist])







    useEffect(() => {
        if (cart) {
            setIsCartMsg(true)
            setTimeout(() => {
                setIsCartMsg(false)
            }, 2000)
        }
    }, [cart])




    useEffect(() => {
        const render = async () => {
            try {
                const res = await axios.get(`/user/isaddtocart/${email}/${id}`);
                setIsCartAdded(res.data.status)
            } catch (err) {
                console.log(err);
            }
        }
        render()
    }, [cart])

    const addToCart = async () => {
        try {
            const res = await axios.put(`/user/addtocart/${email}`, {
                productId: id,
            });
            setIsCartAdded(res.data.status)
            setCart(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    
   
    return (
        <div className='previewContainer'>
            <TopBar />
            <div className="previewProduct">
                <div className='previewProductLeft'>
                    <div className="productImages">
                        {data && data.img.map((im) => (
                            <img className="productImage" alt="productImg" src={"http://localhost:8080/images/" + im} />
                        ))}
                    </div>
                </div>
                <div className='previewProductRight'>
                    <h2 className='name'>{data && data.brandName}</h2>
                    <p className='productDesc'>
                        {data && data.aboutProductShort}
                    </p>
                    <div className='mrpDiv'>
                        <h2 className='productPrice'>₹ {data && data.sellingPrice}</h2>
                        <div className='mrp'>
                            <h2 className='mrpTag'>MRP</h2>
                            <h2 className='actualPrice'> ₹{data && data.mrp}</h2>
                        </div>
                        <h2 className='discount'>({data && data.discount} % OFF)</h2>
                    </div>
                    <p className='taxesInfo'>inclusive of all taxes</p>
                    <div className='selectSize'>
                        <h4 className='size'>SELECT SIZE</h4>
                        <button className='smallSizeButton'>S</button>
                        <button className='smallSizeButton'>M</button>
                        <button className='smallSizeButton'>L</button>
                        <button className='xlSizeButton'>XL</button>
                    </div>
                    <div className='addTo'>
                        <button onClick={addToCart} className={isCartAdded && isCartAdded ==1 ?"alreadyAddedToCart" :'addToBagButton addToBtn'}>
                            {isCartAdded && isCartAdded == 1 ?null:<LocalMallOutlined className='addToIcon' />}
                            

                            {isCartAdded && isCartAdded == 1 ? " GO TO BAG" : "ADD TO BAG"}
                            {isCartAdded && isCartAdded == 1 ?<ArrowForward style={{paddingLeft:"5px"}} className='addToIcon' />:null}

                            </button>
                        <button onClick={addToWishlist} className={isAdded && isAdded == 1 ? "alreadyAddedToWishlist" : 'wishlistButton addToBtn'}>
                            {isAdded && isAdded == 1 ? <Favorite style={{ color: "#FF3366" }} className='addToIcon' /> : <FavoriteBorder className='addToIcon' />}
                            {isAdded && isAdded == 1 ? " WISHLISTED" : "WISHLIST"}
                        </button>
                    </div>
                    <div className='productDetails'>
                        <h5 className='detailHeading'>PRODUCT DETAILS</h5>
                        <p className='detailPara'>{data && data.aboutProductLong}</p>
                        <h5 className='detailHeading'>Features</h5>
                        <p className='detailPara'>{data && data.aboutProductShort}<br />
                            Style: {data && data.style}<br />
                            Sleeve: {data && data.sleeve}<br />
                            Colour: {data && data.color}<br />
                            Print: {data && data.print}<br />
                            Fit: {data && data.fit}</p>
                        <h5 className='detailHeading'>Size & Fit</h5>
                        <p className='detailPara'>{data && data.sizeAndFit}</p>
                        <h5 className='detailHeading'>Material & Care</h5>
                        <p className='detailPara'>{data && data.materialAndCare}</p>
                    </div>
                </div>
            </div>
            {isMsg? <ErrorMsg error={wishlist.message} /> : null}
            {isCartMsg? <ErrorMsg error={cart.message} /> : null}

        </div>
    )
}
