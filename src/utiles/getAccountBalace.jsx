import React, { useEffect } from 'react'
import process from 'process';
import axios from "axios";
import {ethers} from "ethers"
window.process = process;
import chainsId from "../constant/chainID.json"
import toast from 'react-hot-toast';

export const getAccountBalace=async(selectedAccount)=> {
   
    try {

     const userData=  await axios.get(`http://localhost:3000/api/user?accountAddress=${selectedAccount}`)

     if(!userData){
      toast.error("error!!")
      throw Error("Server Error")
      return
     }

     const balanceData = await axios.get(`http://localhost:3000/api/data?accountAddress=${selectedAccount}`)
     let {data} = balanceData;
    return ({FilterData:data.FilterData,AllData:data.AllData,total:data.total,userData:userData});
    return false;
     
  }catch(e){
    console.log(e)
  }
}
