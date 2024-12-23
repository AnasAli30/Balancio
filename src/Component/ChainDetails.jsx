import React, { useEffect } from 'react'
import Chain from './Chain'

export default function ChainDetails({Alltoken}){
  let chainLogos = {
    Ethereum: "https://static.cdnlogo.com/logos/e/81/ethereum-eth.svg", 
    Base: "https://avatars.githubusercontent.com/u/108554348?v=4",
    Polygon: "https://i.pinimg.com/474x/9b/1e/97/9b1e977d00b5d887608b156705a10759.jpg",
    Optimism: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqidBq62tBzMjwxpb9WljM3BuKe6oEHzbJ6Q&s",
    Binance: "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png",
    Arbitrum: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=025",
    linea: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0umBGwUh2RkSi4K1mWrJ3NnNCrrO8IHtMJQ&s" 
  };
  
  return (
    <div className="ChainDetails">
    {/* <Chain name={details?.name} amt={details?.usdValue}></Chain> */}
   {Alltoken?.map((pro)=>{
    return <Chain name={pro.name} amt={pro.value} img={chainLogos[pro.name]}></Chain>
   })}
    </div>

  )
}
