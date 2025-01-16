import React from 'react'
import {getWalletTrx} from "./moralisApi"

export const getAccountTransection=async(address)=>{
    const chain = ["0x1","0x2105","0x89"]

   async function fetchtrx(){
    let eth = await getWalletTrx(address,chain[0])
    eth = eth.map((pro)=>{
        return {...pro,chain:"ethereum"}
    })
    let base = await getWalletTrx(address,chain[1])
    base = base.map((pro)=>{
        return {...pro,chain:"base"}
    })

    let poly = await getWalletTrx(address,chain[2])
    poly = poly.map((pro)=>{
        return {...pro,chain:"polygon"}
    })
    return [...eth,...base,...poly]
    }

  const data  = await fetchtrx();
   const data2= data.filter((pro)=>{
        return pro.possible_spam==false
    }).sort((a,b)=>{
     return Math.floor(new Date(b.block_timestamp) / 1000) - Math.floor(new Date(a.block_timestamp) / 1000)
    })
    
    return data2
   
}