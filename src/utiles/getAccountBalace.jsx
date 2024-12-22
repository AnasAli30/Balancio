import React, { useEffect } from 'react'
import process from 'process';
import axios from "axios";
import {ethers} from "ethers"
window.process = process;
import {getWalletTokenBalancesPrice} from "./moralisApi.js";


export const getAccountBalace=async(selectedAccount)=> {
   
    try {
   
     let filtertrx = await getWalletTokenBalancesPrice(selectedAccount);
      const filteredData = filtertrx
      .map((pro) => {
        if (pro.security_score>80) {
          let num = Number(pro.usd_price);
return {
  contractAddress: pro.token_address,
  tokenName: pro?.name,
  tokenSymbol: pro?.symbol,
  price: num,
  img: pro?.logo,
  amount: parseFloat(Number(ethers.formatUnits(pro.balance)).toPrecision(1)),
  PercentChange: pro?.['24hrPercentChange']
};

        }
        return null; 
      })
      .filter(Boolean); 
    
      return filteredData;

    } catch (error) {
      console.error("Error fetching token balances:", error);
      return null;
    }
  }; 
