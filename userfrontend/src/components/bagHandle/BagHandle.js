import React from 'react'
import {useParams} from "react-router-dom"
import Address from '../../pages/address/Address';
import Bag from '../../pages/bag/Bag';
export default function BagHandle() {
    const params = useParams().cart;
  return (

    <div>
        {params=="address"? <Address /> :null}
        {params=="cart"? <Bag/> :null}
        

    </div>
  )
}
