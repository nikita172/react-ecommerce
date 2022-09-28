import React from 'react'
import LeftBarFeed from '../leftBarFeed/LeftBarFeed'
import RightBarFeed from '../rightBarFeed/RightBarFeed'
import "./feed.css"
export default function Feed({ productOpen, setProductOpen }) {
    return (
        <div className='feedContainer'>
            <div className='leftBarFeed'>
                <LeftBarFeed />
            </div>
            
                {productOpen ?<div className='rightBarFeed'> <RightBarFeed productOpen={productOpen} setProductOpen={setProductOpen} /></div> : null}
            </div>





        
    )
}
