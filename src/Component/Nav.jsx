import React from 'react'
import { useEffect, useRef, useState } from 'react'
import '../App.css'
import Btn from './Btn'
import Search from './Search'
import ProfileDetails from './ProfileDetails'
import MinorDetails from "./MinorDetails"
import MajorDetails from "./MajorDetails"
import Balance from './Balance'

export default function Nav({handleWallet,web3state,buttn}) {
  return (
    <>
    <div className="nav">
        <Btn className="follow" handleWallet={handleWallet} web3state={web3state} btn={buttn}></Btn>
           <Search></Search>
        </div>
        <ProfileDetails accDetails={web3state} handleWallet={handleWallet} web3state={web3state} btn={buttn}></ProfileDetails>
        <MinorDetails></MinorDetails>
        <MajorDetails></MajorDetails> 
        <div className="line"></div>
        <Balance></Balance>
    </>
  )
}
