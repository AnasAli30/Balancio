import React from 'react'

export default function MiniCollect({topOffer,img,TotalNft,name,listing}) {
  return (
    <div className="minicollect">
                <div className='mini1'>
                    <div className="img">
                  <img src={img} alt="" />
                  </div>
                  <div className="names">
                    <p>{name?.length<13?name:`${name?.slice(0,15)}...`}</p>
                    <p >Listed: {listing?"1":"0"}/{TotalNft}</p>
                    </div>
                </div>
                <div className='ethprice'>
                    <p>{topOffer?topOffer*TotalNft:""}ETH</p>
                    <p><span>floor:</span> {topOffer} ETH</p>
                </div>
  </div>
  )
}
