import React, { useEffect, useRef, useState } from 'react'
import { getNfts } from '../utiles/getNfts'
import { useLocation } from 'react-router'
import NftSearch from './NftSearch';
import NftBox from "./NftBox"
import LiftNft from './LiftNft';
import Collections from "./Collections"
import { use } from 'react';
import NotFound from './NotFound';
import LoadingNft from './LoadingNft';

export default function NftSection() {
  let [nft,setNft] = useState();
  let [loading,setloading] = useState(false);
  let[show,setShow] =useState(false);
  let flag  = useRef(true)
  let [filternft,setFilternft] = useState([]);
  let {state} = useLocation();
  useEffect(()=>{
    const fetch=async()=>{
      if(state.address  && flag){
        setNft(await getNfts(state.address))
        setloading(true)
        flag = true;
      }
    }
    fetch()
  },[])

  useEffect(()=>{
    setFilternft(nft?.Data)
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
       
        {loading?filternft?.length?<NftBox Data={filternft} state={state}></NftBox>:<NotFound normal={()=>{setFilternft(nft?.Data)}}></NotFound>:<LoadingNft></LoadingNft>}
        </div>
    </>


  )
}
