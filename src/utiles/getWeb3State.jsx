import {ethers} from "ethers"
import abi from "../constant/abi.json"
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useWalletInfo } from '@reown/appkit/react';
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { JsonRpcProvider ,BrowserProvider} from "ethers";
import axios from "axios"
import toast from "react-hot-toast";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";



export const getWeb3State = async(walletProvider)=>{

    try{
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner();

      const selectedAccount = signer.address;
  
   const message =`Welcome to Balancio!

Click to sign in and accept the Terms of Service and Privacy Policy.
          
This request will not trigger a blockchain transaction or cost any gas fees.
          
Wallet address: ${selectedAccount}` 
let token =localStorage.getItem("token");
          if(!token){
            const signature = await signer.signMessage(message);
          try{
            const res =  await axios.post(`http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,{signature})

            if(res.status==200){
              let token = res.data.token
        
        const res2 = await axios.post(`http://localhost:3000/api/register?accountAddress=${selectedAccount}`,{token})

        if(res2.status==200){
          toast.success(res2.data.message);
          toast.success(res.data.message)
        localStorage.setItem("token",token)
        }
            }else{
             toast.success(res.data.message)
             return
            }

          }catch(e){
            toast.error("Error occur in authentication process")
            console.log(e)
            return false;
            
          }
        }else{
          try{
          const userData=  await axios.get(`http://localhost:3000/api/user?accountAddress=${selectedAccount}`)}
          catch(e){
            if(e.status ==404){
              await axios.post(`http://localhost:3000/api/register?accountAddress=${selectedAccount}`,{token})
            }
          }
        
        }
        
        
        return {signer,selectedAccount}
    }catch(error){
        console.error(error)
        throw new Error
    }
  
} 