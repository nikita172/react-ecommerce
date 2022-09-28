import React from 'react'
import "./rightBar.css"
import { CircularProgress } from "@material-ui/core"
import ShowProducts from '../showProducts/ShowProducts';
export default function RightBar({loading, products}) {

    return (
        <div className='rightBarContainer'>
            <div className="rightBarWrapper">
                <div className="sortBySection">
                    <select name="sortBy" className='sortBy' >
                        <option value="" disabled selected hidden>Sort by : Recommended</option>
                        <option value="recommended">Recommended</option>
                        <option value="whatNew">What's New</option>
                        <option value="popularity">Popularity</option>
                    </select>
                </div>

                <div className="itemsShowcase">
                    {products.length != 0 ? products.map((p) => (
                        <ShowProducts key={p._id} product={p} type="men" />
                    )) :
                        loading ?
                            <div className='closetLoader'>
                                <CircularProgress color="white" size="20px" />
                            </div> 
                            : <div className='emptyMsg'>No items yet !</div>
                            
                    }
                </div>
                
            </div>

        </div>
    )
}
