import React, { useEffect, useState } from 'react'
import { getNfts } from '../utiles/getNfts'
import { useLocation } from 'react-router'
import NftSearch from './NftSearch';
import NftBox from "./NftBox"
import LiftNft from './LiftNft';
import Collections from "./Collections"
import { use } from 'react';

export default function NftSection() {
  let [nft,setNft] = useState([]);
  let[show,setShow] =useState(false);

  let [filternft,setFilternft] = useState();
  let {state} = useLocation();
  useEffect(()=>{
    const fetch=async()=>{
      if(state.address){
        setNft(await getNfts(state.address))
      }
    }
    fetch()
  },[state])

  useEffect(()=>{
    setFilternft(nft.Data)
  },[nft])

  const search = (e) => {
    let value = e.target.value.toLowerCase(); 
    let filteredNfts = nft.Data.filter((pro) => {
      return pro.name.toLowerCase().includes(value); 
    })
    setFilternft(filteredNfts)
  }
  console.log(nft)
  return (
    <>
   
        <NftSearch search={search} setShow={setShow} show={show}/>
        <div className="innerBox">
       {show?<Collections Data={nft}></Collections>:null}
        <NftBox Data={filternft} state={state}></NftBox>
        </div>
    </>


  )
}
