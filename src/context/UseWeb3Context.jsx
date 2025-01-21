import { useContext } from "react";
import { Web3Context } from "./Web3Context";

export const useWeb3Context=()=>{
    const web3state = useContext(Web3Context);
    return web3state;
}