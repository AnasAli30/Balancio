import React from 'react'
import axios from 'axios'

export const getAccountTransection=async(address)=>{
    try{
  const res =  await axios.get(`http://localhost:3000/api/trx?accountAddress=${address}`)
let {data} =res;
let trx = data.trx;
console.log(trx)
  return trx

    }catch(e){
        console.log(e)
    }
}