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
import Particle from '../particles/particles'
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
        setbuttn("Connecting...");
      const {signer,selectedAccount,chainId,balance} = await getWeb3State();
        setweb3state({signer,selectedAccount,chainId,balance})
        try{
        setLoading(true);
        let {FilterData,AllData,total} = await getAccountBalace(selectedAccount);
        
        setLoading(false);
        setToken(FilterData);
        setAllToken(AllData);
        setTotalBalace(total);
        navigateTo("/home")
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
    <div className="particle">
    <div className="home">
      <Particle />
      <div className="wallet-container">
        <h1 className="title">BALANCIO</h1>
        <button onClick={handleWallet} className="connect-btn" type="button">
          {buttn}
        </button>

        <div className="features">
          <div className="feature-box">
            <h3 className="feature-title">Multi-Network Support</h3>
            <p className="feature-desc">
              Access and manage your balances from multiple blockchain networks in one dashboard.
            </p>
          </div>
          <div className="feature-box">
            <h3 className="feature-title">NFT Tracking</h3>
            <p className="feature-desc">
              View your NFT collections with detailed metadata and historical insights.
            </p>
          </div>
          <div className="feature-box">
            <h3 className="feature-title">Transaction History</h3>
            <p className="feature-desc">
              Analyze and export your complete transaction history across networks.
            </p>
          </div>
        </div>

       
      </div>
    </div>
  </div>
  )
}
