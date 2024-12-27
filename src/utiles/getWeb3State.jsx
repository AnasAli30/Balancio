import {ethers} from "ethers"
import abi from "../constant/abi.json"
import { JsonRpcProvider ,BrowserProvider} from "ethers";

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
          
        const chainId = parseInt(chainIdHex,16);
        let provider = new BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contractAddress = "0x1d849bffe7e003b5604ec25994ddb5169d9a1f60";

        const contractInstance = new ethers.Contract(contractAddress,abi,signer)
        return {contractInstance,selectedAccount,chainId,balance}
    }catch(error){
        console.error(error)
        throw new Error
    }
  
} 