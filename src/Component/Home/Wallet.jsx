import React from 'react'
import Btn from '../Btn'
import Search from '../Search'
import "./wallet.css"
import { useWeb3Context } from '../../context/UseWeb3Context'
import { useAppKitNetwork } from "@reown/appkit/react";
import { getWeb3State } from '../../utiles/getWeb3State'
import { getAccountBalace } from '../../utiles/getAccountBalace'
import { initializeMoralis } from '../../utiles/moralisApi'
import { useNavigate } from 'react-router'
import { useRef,useEffect,useState } from 'react'
import Particle from '../particles/particles'
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, mainnet , base } from '@reown/appkit/networks'
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import ConnectButton from '../ConnectButton'


const projectId = '3c76f181698781d2991464f97c01b88d';


const networks = [arbitrum, mainnet,base];

const metadata = {
  name: 'debank_clone',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

export default function Wallet() {

  let navigateTo = useNavigate()
  let {web3state,setweb3state,buttn,setToken,setAllToken,setTotalBalace,setLoading,setbuttn,setuserData} = useWeb3Context();


createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
      connectMethodsOrder: ['wallet'],
    }
  })
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } = useAppKitNetwork()

  useEffect(()=>{
    console.log(isConnected)
    if(isConnected){
      
  const handleWallet = async()=>{
    try{
      if(buttn=="Disconnect"){
        setweb3state({undefined})
        setbuttn("connect again");
      }else{
        setbuttn("Connecting...");
        
      const {signer,selectedAccount,balance} = await getWeb3State(walletProvider);
        setweb3state({signer,selectedAccount,chainId,balance})
        try{
        setLoading(true);
        let {FilterData,AllData,total,userData} = await getAccountBalace(selectedAccount);
        
        setuserData(userData.data)
        setLoading(false);
        setToken(FilterData);
        setAllToken(AllData);
        setTotalBalace(total);
        navigateTo("/home")
        }catch(error){
          console.log("error",error)
        }
     
        selectedAccount==undefined?setbuttn("connect again"):setbuttn("Wallet");
      }
  
      
    }catch(error){
        console.error(error)
    }
    
  }
handleWallet()
    }
  },[isConnected])

  // console.log(model.getProvider())

  let flag = useRef(true)
  useEffect(()=>{
    async function fetch() {
    //  await getWeb3State()
      await initializeMoralis();
      console.log("Initiazed")
    }
    if(flag){
    fetch()
    flag=false;
  }
  },[])

  return (
    <div className="particle">
    <div className="home">
      <Particle />
      <div className="wallet-container">
        <h1 className="title">BALANCIO</h1>
        <ConnectButton buttn={buttn}></ConnectButton>

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
