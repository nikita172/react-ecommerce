import React, { useEffect } from 'react'
export default function AddressInfo({ address }) {
    return (
        <div className="address">
            <input type="radio" className='selectDefault' name="add" id="uni" checked={true} />
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
                    <button className="addnewAddBtn">Remove</button>
                    <button className="addnewAddBtn editBtn">Edit</button>
                </div>
            </label>
        </div>
    )
}
