import React, { useEffect, useState } from 'react'
import MiniCollect from './MiniCollect'
import { use } from 'react'
import NotFound from './NotFound'

export default function Collections({Data}) {
    let [collectData , setCollectData] = useState([])
    useEffect(()=>{
      setCollectData(Data?.nftData);
    },[])
  return (
    <div className='Collections'>
        <div className="innercollection">
        <div>Collections</div>
        <i class="fa-solid fa-arrow-up-long"></i>
        </div>
        <div className="search">
        <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Search by name' onChange={(e)=>{
              let value = e.target.value
             let d = Data?.nftData?.filter((pro)=>{
                return pro?.nft?.contractName?.toLowerCase().includes(value.toLowerCase());
              })
              setCollectData(d);
            }} />
        </div>
        <div className="realCollections">
            <div className="innerreal">
                <div>COLLECTION</div>
                <div>VALUE</div>
            </div>
         
          {collectData?.length?collectData?.map((pro)=>{
            return <MiniCollect name={pro.nft.contractName} TotalNft={pro.TotalNft} img={pro.nft.image} topOffer={pro.nft.topOffer} listing={pro.nft.listing} ></MiniCollect>
          }):<div style={{width:"100%",textAlign:"center",color:"#353535"}}>Not Found</div>}
           </div>
        </div>
  )
}
