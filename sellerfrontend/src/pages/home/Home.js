
import "./home.css"
import TopBar from '../../components/topBar/TopBar'
import Feed from '../../components/feed/Feed'
import React, { useState } from 'react'

export default function Home() {
  const [productOpen , setProductOpen] = useState(false)
    const openRightBar =()=>{
      if(productOpen===false){
        setProductOpen(true)

      }
        


    }
  return (
    <div className='homeConatiner'>
      <TopBar  productOpen={productOpen}  setProductOpen={setProductOpen} openRightBar={openRightBar}/>
      <Feed productOpen={productOpen} setProductOpen={setProductOpen} />
    </div>
  )
}

