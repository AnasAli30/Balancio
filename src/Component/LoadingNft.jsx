import React from 'react'

export default function LoadingNft() {
    let arr= [1,2,3,4,5]
  return (
    <div className='LoadingNft'>
       {arr.map((pro)=>{
        return <div className="nftbox">
        <div className="nft">
      <div className="img imgblur" >
        <img src="" alt="" />
        </div>
        <div className="text">
          <div className="nftname">
            <p className='nameblur'></p>
            <p className='collection collecblur'></p>
            </div>
        </div>
    </div>
      </div>
       }) }
    </div>
  )
}
