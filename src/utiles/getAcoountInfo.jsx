import { ethers, getAccountPath } from "ethers"

// import React from 'react'
export const getAccountInfo=async({chainId,balance})=>{
    const url = `https://chainid.network/chains.json`;
    async function fetchETHPrice() {
        const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
        try {
          const response = await fetch(apiURL);
          const data = await response.json();
          return data.ethereum.usd; // Current ETH price in USD
        } catch (error) {
          console.error("Error fetching ETH price:", error);
          return 0; // Fallback to 0 in case of error
        }
      }

    try{
        const response = await fetch(url);
        const chains = await response.json();
        const chainInfo = chains.find(chain => chain.chainId === chainId);
        const weiBalance = BigInt(balance);
  const etherBalance = ethers.formatEther(weiBalance);
  const ethPriceInUSD = await fetchETHPrice();
  let usdValue = parseFloat(etherBalance) * ethPriceInUSD;
   usdValue = usdValue.toPrecision(3)
        if (chainInfo) {
            return {
              name: chainInfo.name,
              logo: chainInfo.nativeCurrency.symbol, // Update this if Chainlist API provides logo URLs,
              usdValue:usdValue
            };
          } else {
            return { name: "Unknown", logo: "" };
          }
    }catch(error){
        console.error(error)
        throw new Error
    }
  
} 