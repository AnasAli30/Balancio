import Moralis from 'moralis';



export const initializeMoralis= async()=>{
try{
  await Moralis.start({ apiKey: "" });
}catch(error){
  console.log(error);
}
}



export const getWalletTokenBalancesPrice = async (address, chain) => {
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