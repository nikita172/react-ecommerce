import React from 'react'
import AddressRightBar from '../../components/addressRightBar/AddressRightBar'
import BagTopBar from '../../components/bagTopBar/BagTopBar'
import "./address.css"
import { useState, useEffect, useRef } from 'react'
import { CircularProgress } from "@material-ui/core"
import { Clear } from '@material-ui/icons';
import axios from "axios"
import { Link } from "react-router-dom"
import { CheckCircleOutline } from '@material-ui/icons';
export default function Address() {
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [bagItem, setBagItem] = useState([])
    const [address, setAddress] = useState([])
    const formRef = useRef({})
    const [showOrderPlaced, setShowOrderPlaced] = useState(false)
    const [inputState, setInputState] = useState({
        name: "",
        mobile: "",
        pincode: "",
        location: "",
        town: "",
        city: "",
        state: "",
        saveAddress: "",
        email: ""
    })
    const user = JSON.parse(localStorage.getItem("user"))
    const userEmail = user[1]
    let change = 0;
    useEffect(() => {
        const fetchBag = async () => {
            const res = await axios.get(`/user/bagitem/${userEmail}`)
            setBagItem(res.data)
        }
        fetchBag()
    }, [change]
    )
    useEffect(() => {
        const fetchAddress = async () => {
            const res = await axios.get(`/user/getaddress/${userEmail}`)
            setAddress(res.data)
        }
        fetchAddress()
    }, [loading]
    )
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const userEmail = JSON.parse(localStorage.getItem('user'))
        const email = userEmail[1]
        const data = {
            name: formData.get('name'),
            mobile: formData.get('mobile'),
            pincode: formData.get('pincode'),
            location: formData.get('location'),
            town: formData.get('town'),
            city: formData.get('city'),
            state: formData.get('state'),
            saveAddress: formData.get('saveAddress'),
            email: email
        }
        try {
            setLoading(true)
            await axios.post("/user/addnewaddress", data)
            setLoading(false)
            setOpenModal(false)
        } catch (err) {
            console.log(err)
        }
    }
    const resetState = () => {
        setInputState({
            name: "",
            mobile: "",
            pincode: "",
            location: "",
            town: "",
            city: "",
            state: "",
            saveAddress: "",
            email: ""
        })
    }
    const removeAddress = async (id) => {
        const res = await axios.delete(`/user/delete/address/${id}`)
        setAddress((oldAddress) => oldAddress.filter(a => a._id !== id))
    }
    const onInputChange = (e) => {
        setInputState((oldState) => {
            const newState = {
                ...oldState, [e.target.name]: e.target.value
            }
            return newState;
        })
    }
    useEffect(() => {
        if (!openModal) {
            resetState();
        }
    }, [openModal])
    const onEditClick = (address) => {
        setInputState(address)
        setOpenModal(true)
    }
    return (
        <>
            <div className={openModal ? "addModal" : showOrderPlaced ? "hideAddress" : 'addressContainer'}>
                <BagTopBar />
                <div className='addressWrapper'>
                    <div className="addressWrapperLeft">
                        <div className="addressDetailLeft">
                            <div className="addressHead">
                                <p className='itemSelect'>Select Delivery Address</p>
                                <button className='addnewAddBtn' onClick={() => setOpenModal(true)}>ADD NEW ADDRESS</button>
                            </div>
                            <form ref={formRef}>
                                {address && address.map(address => (
                                    <div className="address">
                                        <input type="radio" className='selectDefault' name="add" id="uni" checked={true} value={address._id} />
                                        <label for="uni">
                                            <h4 className='userName'>{address.name}</h4>
                                            <p className=' user userCity'>{address.location}, {address.city}</p>
                                            <p className='user userState'>{address.town} {address.state} - {address.pincode}</p>
                                            <p className='user userMobile'>Mobile :
                                                <h5 className='mobile'>{address.mobile}</h5> </p>
                                            <ul className='payNote'>
                                                <li className='note'>Only pay on delivery available</li>
                                            </ul>
                                            <div>
                                                <button className="addnewAddBtn" type='button' onClick={() => removeAddress(address._id)}>Remove</button>
                                                <button className="addnewAddBtn editBtn" type='button' onClick={() => onEditClick(address)}>Edit</button>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </form>
                            <div className='addNewAddress'>
                                <button className='AddNewBtn' onClick={() => setOpenModal(true)}>
                                    + Add New Address</button>
                            </div>
                        </div>
                    </div>
                    <AddressRightBar bagItem={bagItem} form={formRef} email={userEmail} setShowOrderPlaced={setShowOrderPlaced} />
                </div>
            </div>
            <div className={openModal ? "show" : 'addAddressContainer'}>
                <div className="addAddressWrapper">
                    <form onSubmit={handleFormSubmit} >
                        <div className="newAddress">
                            <h5>ADD NEW ADDRESS</h5>
                            <button className="addressCloseBtn" type="button" onClick={() => setOpenModal(!openModal)}
                            ><Clear /></button>
                        </div>
                        <div className="mainAdd">
                            <div className="contactDetails">
                                <h5>CONTACT DETAILS</h5>
                                <input className="addressInputs" name='name' type="text" placeholder='Name*' onChange={onInputChange} value={inputState.name} required />
                                <input className="addressInputs" name="mobile" value={inputState.mobile} onChange={onInputChange} type="number" placeholder='Mobile No*' required />
                            </div>
                            <div className="newAddressDetails">
                                <h5>ADDRESS</h5>
                                <input className="addressInputs" name="pincode" type="number" onChange={onInputChange} value={inputState.pincode} placeholder='Pincode*' required />
                                <input className="addressInputs" name="location" onChange={onInputChange} value={inputState.location} type="text" placeholder='Address (House No,Building,Street,Area)*' required />
                                <input className="addressInputs" name="town" onChange={onInputChange} value={inputState.town} type="text" placeholder='Locality / Town*' required />
                                <div className='cityDis'>
                                    <input placeholder='City / District*' onChange={onInputChange} value={inputState.city} type="text" name='city' required />
                                    <input placeholder='State*' name="state" onChange={onInputChange} value={inputState.state} type="text" required />
                                </div>
                            </div>
                            <div className="saveAddress">
                                <h5>SAVE ADDRESS AS</h5>
                                <select name="saveAddress" id="saveAddress" for="p" onChange={onInputChange} required value={inputState.saveAddress}>
                                    <option value="" disabled selected hidden>save address as</option>
                                    <option value="home" name="p">Home</option>
                                    <option value="work" name="p">Office</option>
                                </select>
                            </div>
                        </div>
                        <div className="addnewDiv">
                            <button className='addNewAddressBtn' type='submit'>
                                {loading ? <CircularProgress color="white" size="12px" /> : "ADD ADDRESS"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={showOrderPlaced ? "emptyBar" : "hideOrderComfirmed"}>
                <CheckCircleOutline style={{ color: "rgb(7, 199, 7)", fontSize: "150px" }} />
                <p className='orderPlaced'>Order Placed !</p>
                <Link className="links" to="/">
                    <button className='goToHomeBtn'>RETURN TO HOME </button>
                </Link>
                <Link className="links" to="/orders">
                    <button className='goToHomeBtn'>CHECK YOUR ORDERS </button>
                </Link>
            </div>
        </>
    )
}
