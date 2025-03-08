import React from 'react'
import { useEffect, useRef, useState } from 'react'
import '../App.css'
import Btn from './Btn'
import Search from './Search'
import ProfileDetails from './ProfileDetails'
import MinorDetails from "./MinorDetails"
import MajorDetails from "./MajorDetails"
import Balance from './Balance'
import ConnectButton from './ConnectButton'

export default function Nav({handleWallet,web3state,buttn,userData}) {
  return (
    <>
    <div className="nav">
        {web3state.selectedAccount!=undefined? <ConnectButton buttn={buttn}></ConnectButton>:""}
           <Search></Search>
        </div>
        <ProfileDetails userData={userData} accDetails={web3state} handleWallet={handleWallet} web3state={web3state} btn={buttn}></ProfileDetails>
        <MinorDetails></MinorDetails>
        <MajorDetails></MajorDetails> 
        <div className="line"></div>
        <Balance web3state={web3state}></Balance>
    </>
  )
}
