import React from 'react'
import Chain from './Chain'
import {getAccountInfo} from '../utiles/getAcoountInfo';
import { getAccountBalace } from '../utiles/getAccountBalace';
import { useState ,useEffect} from 'react';

export default function ChainDetails({web3state}){
    const [details, setDetails] = useState(null); // State to store the 
    useEffect(() => {
      // Define an async function inside the useEffect
      const fetchAccountDetails = async () => {
        if (web3state.chainId != null) {
          try {
            const details = await getAccountBalace(web3state);
            setDetails(details); // Update state with fetched details
            // console.log(details);
          } catch (error) {
            console.error("Error fetching account details:", error);
          }
        }
      };
  
      fetchAccountDetails(); // Call the async function
    }, [web3state]);
  return (
    <div className="ChainDetails">
    {/* <Chain name={details?.name} amt={details?.usdValue}></Chain> */}
    <Chain></Chain>
    <Chain></Chain>
    </div>

  )
}
