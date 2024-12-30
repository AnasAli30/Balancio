import React from 'react'
import MiniCollect from './MiniCollect'

export default function Collections({Data}) {
    console.log(Data)
  return (
    <div className='Collections'>
        <div className="innercollection">
        <div>Collections</div>
        <i class="fa-solid fa-arrow-up-long"></i>
        </div>
        <div className="search">
        <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Search by name'  />
        </div>
        <div className="realCollections">
            <div className="innerreal">
                <div>COLLECTION</div>
                <div>VALUE</div>
            </div>
         
          {Data?.nftData?.map((pro)=>{
            return <MiniCollect name={pro.nft.contractName} TotalNft={pro.TotalNft} img={pro.nft.image} topOffer={pro.nft.topOffer} listing={pro.nft.listing} ></MiniCollect>
          }) }
           </div>
        </div>
  )
}
