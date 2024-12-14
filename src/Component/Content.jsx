import React from 'react'
import { Web3Context } from '../context/web3Context'
import { useContext } from 'react'
import  {getWeb3State} from '../utiles/getWeb3State';
import { ethers } from 'ethers';



export default function Content() {
    const {contractInstance,selectedAccount,chainId,balance} = useContext(Web3Context);
    let bal = null
    if(balance){
     bal = ethers.formatEther(balance);}
    console.log(selectedAccount)
  return (
    <div className='content'>
        <h1>{selectedAccount?`Wallet Details`:`Connect your wallet`}</h1>
        <h3>{selectedAccount?`Account:${selectedAccount}`:``}</h3>
        <h3>{chainId?`chainId:${chainId}`:``}</h3>
        <p>{chainId?`Balance:${bal} eth`:``}</p>
    </div>
  )
}
