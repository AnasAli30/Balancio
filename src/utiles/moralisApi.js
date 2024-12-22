import Moralis from 'moralis';

// Fetch prices for multiple ERC20 tokens
export const getWalletTokenBalancesPrice = async (address, chain = "0x2105") => {
  try {
    await Moralis.start({ apiKey: "" });
    const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
      "chain": "0x2105",
      "address": address
    });
    console.log(response.raw())
    return response.raw().result;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw error;
  }
};
