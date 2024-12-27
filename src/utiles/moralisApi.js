import Moralis from 'moralis';



export const initializeMoralis= async()=>{
try{
  await Moralis.start({ apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQzODIyNGE3LWY2MTgtNGVkNy05YjFhLTUxZjIyZDUyZmY5MiIsIm9yZ0lkIjoiNDIyMTM0IiwidXNlcklkIjoiNDM0MTQ0IiwidHlwZUlkIjoiZWRmYTNmMjAtNzRhYS00MTczLTliZDQtMmMwZTBhODg5NWJiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzQ4ODQ0NTEsImV4cCI6NDg5MDY0NDQ1MX0.jnptP6n3QO3hNFu4Is-ygKhvCRAmT648bChakt036fQ" });
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
