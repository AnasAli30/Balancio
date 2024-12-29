import React from 'react'
import {ethers} from "ethers"
import abi from "../constant/transferabi.json"

export const transfer=async(signer,contractAddress,account,recipient,tokenId)=>{
    console.log(signer,contractAddress,account,recipient,tokenId)
    const nftContract = new ethers.Contract(contractAddress, abi, signer);
            try{
    { const trx = await nftContract.safeTransferFrom(account, recipient, tokenId)
     await trx.wait();
     return trx;}}
     catch(err){
console.error(err);
     }
}
