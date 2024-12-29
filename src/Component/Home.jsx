import React from 'react'
import { useEffect, useRef, useState } from 'react'
import '../App.css'
import ChainDetails from "./ChainDetails"
import TokenDetails from "./TokenDetails"
import Loadingchain from "./Loadingchain.jsx"
import { initializeMoralis} from "../utiles/moralisApi.js";
import Nav from './Nav.jsx'
import { useOutletContext } from 'react-router'



export default function Home() {
 
    let flag = useRef(true)
    useEffect(()=>{
      async function fetch() {
        await initializeMoralis();
        console.log("Initiazed")
      }
      if(flag){
      fetch()
      flag=false;
    }
    },[])
    const [handleWallet,web3state,buttn,Loading,Alltoken,totalBalance,token]= useOutletContext()

  return (
    <>
    
        {/* <Nav handleWallet={handleWallet} web3state={web3state} buttn={buttn}></Nav> */}
    {web3state.selectedAccount!=undefined?<>
    {!Loading?<><ChainDetails Alltoken={Alltoken} totalBalance={totalBalance}></ChainDetails></>:<><Loadingchain></Loadingchain></>}

{!Loading?<TokenDetails web3state={web3state} token={token}></TokenDetails>:<></>}</>

:<>Connect Wallet</>

}
    
   
    </>
  )
}
