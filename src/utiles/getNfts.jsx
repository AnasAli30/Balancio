import React from 'react'
import axios from "axios"

export const getNfts=async(address)=>{
  try{
 
  const res =  await axios.get(`http://localhost:3000/api/nft?accountAddress=${address}`)
let {data} =res;
let {arr} = data;
  return arr

    }catch(e){
        console.log(e)
    }
}
