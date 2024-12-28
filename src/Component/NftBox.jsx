import React from 'react'
import Nft from './Nft'

export default function NftBox({Data}) {
    console.log(Data)
  return (
    <>
    {/* <div className='total'>123</div> */}
    <div className="nftbox">
     {Data?.Data?.map((pro)=>{
         return <Nft name={pro.name} img={pro.image} collectname={pro.contractName} rare={pro.rank} chain={pro.chain}/>
      })}
      </div>
    </>
  )
}
