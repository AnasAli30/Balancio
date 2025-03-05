
import { Outlet } from 'react-router'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getWeb3State } from './utiles/getWeb3State'
import {getAccountBalace} from "./utiles/getAccountBalace"
import Web3Provider from './context/Web3Provider'
import Nav from './Component/Nav'
import {useWeb3Context} from "./context/UseWeb3Context"
import { useNavigate } from 'react-router'
import Particle from './Component/particles/particles'

function App() {
  let navigateTo = useNavigate()
    
    let {web3state,token,Alltoken,totalBalance,Loading,handleWallet,buttn} = useWeb3Context();
    useEffect(()=>{
      if(web3state.selectedAccount == undefined){
        navigateTo("/wallet")
      }
    },[])

  return (
    <>
    {/* <Particle /> */}
    <div className="Container">
    <Web3Provider web3state={web3state}>
     <Nav handleWallet={handleWallet} web3state={web3state} buttn={buttn}></Nav>
    <Outlet context={[handleWallet,web3state,buttn,Loading,Alltoken,totalBalance,token]}/>
    </Web3Provider>
    </div>
    </>
  )
}

export default App
