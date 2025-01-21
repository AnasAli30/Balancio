import React from 'react'
import Btn from '../Btn'
import Search from '../Search'
import "./wallet.css"
import { useWeb3Context } from '../../context/UseWeb3Context'
import { getWeb3State } from '../../utiles/getWeb3State'
import { getAccountBalace } from '../../utiles/getAccountBalace'
import { initializeMoralis } from '../../utiles/moralisApi'
import { useNavigate } from 'react-router'
import { useRef,useEffect,useState } from 'react'
export default function Wallet() {
  let navigateTo = useNavigate()
  let {web3state,setweb3state,buttn,setToken,setAllToken,setTotalBalace,setLoading,setbuttn} = useWeb3Context();

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

  const handleWallet = async()=>{
    try{

      
      if(buttn=="Disconnect"){
        setweb3state({undefined})
        setbuttn("connect again");
      }else{
        setbuttn("connecting");
      const {signer,selectedAccount,chainId,balance} = await getWeb3State();
        setweb3state({signer,selectedAccount,chainId,balance})
        try{
        setLoading(true);
        let {FilterData,AllData,total} = await getAccountBalace(selectedAccount);
        
        setLoading(false);
        setToken(FilterData);
        setAllToken(AllData);
        setTotalBalace(total);
        navigateTo("/nft")
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
    <div className='home'>
      <div className="head">
        <h2>BALANCIO</h2>
       <Search></Search>
        <p>Or</p>
        <Btn className="follow connect" handleWallet={handleWallet} web3state={web3state} btn={buttn}></Btn>
      </div>
    </div>
  )
}
