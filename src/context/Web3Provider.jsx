import React, { useState } from 'react'
import { Web3Context } from './web3Context'
import {getWeb3State} from '../utiles/getWeb3State'
export default function Web3Provider({children,web3state}) {
   
  return (
    <>
   
    <Web3Context.Provider value={web3state}>
{children}
    </Web3Context.Provider>
   
    </>
  )
}
