import React from 'react'
import axios from "axios"

export const getNfts=async(address)=>{

  const fetch=async(chain)=>
    {
      let uri = `https://${chain}.mintify.xyz/api/getOwnerWallet?owner=${address}&ownerAltAddress&limit=500&page=1&sort=time-desc`;
      const {data} = await axios
      .get(uri);
      // console.log(data)
      // if(data)
      const Data = data.data.filter((pro)=>{
        return pro.image && !pro.is_flagged
      })
      const dup =[];
      const nftData = Data.map((pro1)=>{
       
       let count = Data.map((pro2)=>{
        let c=0;
           if( (pro1.contract_address==pro2.contract_address)){
           c++;
           }
        return c;
        }).reduce((pro,index)=>{
          return pro+index;
         },0)
  
       if(!dup.includes(pro1.contract_address)){
        dup.push(pro1.contract_address)
        return ({
          TotalNft :count,
          nft:pro1
        })
      }
      }).filter(Boolean)
      return {nftData,Data};
  }

 const base =await fetch('base')
 .catch(()=>{
  return {
    nftData:[],
    Data:[]
  };
 })
 const eth = await fetch('trade')
 .catch((e)=>{
  return {
    nftData:[],
    Data:[]
  }
 })
 let arr = {nftData:[...base.nftData,...eth?.nftData],Data:[...base.Data,...eth?.Data].sort((a,b)=>b.topOffer - a.topOffer)}
return arr;
}
