import React, { useEffect, useState } from 'react'
import { getNfts } from '../utiles/getNfts'
import { useLocation } from 'react-router'
import NftSearch from './NftSearch';
import NftBox from "./NftBox"

export default function NftSection() {
  let [nft,setNft] = useState([]);
  let {state} = useLocation();
  useEffect(()=>{
    const fetch=async()=>{
      if(state.address){
        setNft(await getNfts(state.address))
      }
    }
    fetch()
  },[state])
   console.log(nft)
  return (
    <>
        <NftSearch/>
        <NftBox Data={nft}></NftBox>
    </>


  )
}
