const Moralis = require('moralis').default
require('dotenv').config();
const  chainsId = require("../constant/chainID.json")

const initializeMoralis= async()=>{
try{
  await Moralis.start({ apiKey: process.env.VITE_MORALIS});
  console.log("Molarise initialized")
}catch(error){
  console.log(error);
}
}



const getWalletTokenBalancesPrice = async (address, chain) => {
  try {

    const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
      "chain": chain,
      "address": address
    });
    console.log(response.raw())
    return response.raw().result;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw error;
  }
};


const getWalletTrx = async(address,chain)=>{
  try{
    const response = await Moralis.EvmApi.wallets.getWalletHistory({
      "chain": chain,
      "order": "DESC",
      "address": address
    });
    return  response.raw().result
  }catch(e){
    console.log(e)
  }

}

module.exports = {initializeMoralis,getWalletTokenBalancesPrice,getWalletTrx}