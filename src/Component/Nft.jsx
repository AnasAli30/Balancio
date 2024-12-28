import React from 'react'

export default function Nft({img,name,collectname,rare,chain}) {
  let chainLogos = {
    eth: "https://static.cdnlogo.com/logos/e/81/ethereum-eth.svg", 
    base: "https://avatars.githubusercontent.com/u/108554348?v=4",
  };
  return (
    <div className="nft">
      <div className="img">
        <div className="logo"><img src={chainLogos[chain]} alt="" /></div>
        <img src={img} alt="" />
        </div>
        <div className="text">
          <div className="nftname">
            <p>{name}</p>
            <p className='collection'>{collectname}</p>
            </div>
            {rare? <div className="rare">
                # {rare}
            </div>:""}
        </div>
        <div className="icon">
        <i class="fa-solid fa-ellipsis"></i>
        </div>
    </div>
  )
}
