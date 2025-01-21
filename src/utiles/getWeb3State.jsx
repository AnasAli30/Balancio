import {ethers} from "ethers"
import abi from "../constant/abi.json"
import { JsonRpcProvider ,BrowserProvider} from "ethers";
import axios from "axios"
import toast from "react-hot-toast";

export const getWeb3State = async()=>{
    try{
        //metamask installation check
        if(!window.ethereum){
            throw new Error("Metamask is not installed")
        }
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })
        const selectedAccount = accounts[0];

        const chainIdHex = await window.ethereum.request({
            method:'eth_chainId'
        })

        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [selectedAccount, 'latest']
          });

          const message =`Welcome to Balancio!

Click to sign in and accept the Terms of Service and Privacy Policy.
          
This request will not trigger a blockchain transaction or cost any gas fees.
          
Wallet address: ${selectedAccount}` 
let provider = new BrowserProvider(window.ethereum)
const signer = await provider.getSigner()
        

          if(!localStorage.getItem("token")){
            const signature = await signer.signMessage(message);
          try{
            const res =  await axios.post(`http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,{signature})

            if(res.status==200){
        toast.success(res.data.message)
        localStorage.setItem("token",res.data.token)
            }else{
             toast.success(res.data.message)
             return
            }

          }catch(e){
            toast.error("Error occur in authentication process")
            console.log(e)
          }
        }
        
        const chainId = parseInt(chainIdHex,16);
        
        return {signer,selectedAccount,chainId,balance}
    }catch(error){
        console.error(error)
        throw new Error
    }
  
} 