import React, { useState } from 'react'
import { Web3Context } from './web3Context.jsx'
import {getWeb3State} from '../utiles/getWeb3State'
import { getAccountBalace } from '../utiles/getAccountBalace.jsx'
export default function Web3Provider({children}) {

  const [web3state,setweb3state] = useState({
    signer:null,
    selectedAccount:null,
    chainId:null,
    balance:null
  })
  const [token, setToken] = useState([]);
      const [Alltoken, setAllToken] = useState([]);
      const [totalBalance,setTotalBalace] = useState(0);
      const [userData,setuserData] = useState([]);
      const[Loading,setLoading] = useState(false);
  let [buttn,setbuttn] = useState("Connect Wallet");
  return (
    <>

    <Web3Context.Provider value={{web3state,setweb3state,token,Alltoken,totalBalance,Loading,buttn,setToken,setAllToken,setTotalBalace,setLoading,setbuttn,setuserData,userData}}>
{children}
    </Web3Context.Provider>
   
    </>
  )
}
