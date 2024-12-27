
import { Outlet } from 'react-router'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getWeb3State } from './utiles/getWeb3State'
import {getAccountBalace} from "./utiles/getAccountBalace"
import Nav from './Component/Nav'


function App() {
    const [token, setToken] = useState([]);
      const [Alltoken, setAllToken] = useState([]);
      const [totalBalance,setTotalBalace] = useState(0);
      const[Loading,setLoading] = useState(false);
  let [buttn,setbuttn] = useState("connect");
  const [web3state,setweb3state] = useState({
    contractInstance:null,
    selectedAccount:null,
    chainId:null,
    balance:null
})
const handleWallet = async()=>{
  try{
    
    console.log(buttn)
    if(buttn=="Disconnect"){
      setweb3state({undefined})
      setbuttn("connect again");
    }else{
      setbuttn("connecting");
    const {contractInstance,selectedAccount,chainId,balance} = await getWeb3State();
      setweb3state({contractInstance,selectedAccount,chainId,balance})
      try{
      setLoading(true);
      let {FilterData,AllData,total} = await getAccountBalace(selectedAccount);
      setLoading(false);
      setToken(FilterData);
      setAllToken(AllData);
      setTotalBalace(total);
      }catch(error){
        console.log("error",error)
      }
   
      selectedAccount==undefined?setbuttn("connect again"):setbuttn("Disconnect");
    }

    
  }catch(error){
      console.error(error)
  }
  
}
  return (
    <>
    <div className="Container">
     <Nav handleWallet={handleWallet} web3state={web3state} buttn={buttn}></Nav>
    <Outlet context={[handleWallet,web3state,buttn,Loading,Alltoken,totalBalance,token]}/>
    </div>
    </>
  )
}

export default App
