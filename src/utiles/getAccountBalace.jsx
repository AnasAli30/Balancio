import React, { useEffect } from 'react'
import process from 'process';
window.process = process;


export const getAccountBalace=async({selectedAccount})=> {

    const base = process.env.REACT_APP_BASE;
const bsc = process.env.REACT_APP_BSC;
const eth = process.env.REACT_APP_ETH;
const ape = process.env.REACT_APP_APE;
console.log(selectedAccount,eth)
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${selectedAccount}&startblock=0&endblock=99999999&sort=asc&apikey=${eth}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "1" && data.result) {
        // Parse and aggregate token balances
        const tokens = {};
        data.result.forEach((tx) => {
          const token = tx.tokenSymbol;
          const decimals = tx.tokenDecimal;
          const value = parseInt(tx.value, 10) / 10 ** decimals;
  
          if (!tokens[token]) {
            tokens[token] = { name: tx.tokenName, balance: 0, contract: tx.contractAddress };
          }
  
          // Update balance
          if (tx.to.toLowerCase() === walletAddress.toLowerCase()) {
            tokens[token].balance += value;
          } else if (tx.from.toLowerCase() === walletAddress.toLowerCase()) {
            tokens[token].balance -= value;
          }
        });
  
        return Object.values(tokens).filter((token) => token.balance > 0); // Return tokens with positive balances
      } else {
        console.error("Error fetching token balances:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching token balances:", error);
      return [];
    }
  }; 
