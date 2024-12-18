import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Content from './Component/Content'
import Web3Provider from './context/web3Provider'
import Btn from './Component/Btn'
import { getWeb3State } from './utiles/getWeb3State'
import Search from './Component/Search'
import ProfileDetails from './Component/ProfileDetails'
import MinorDetails from "./Component/MinorDetails"
import MajorDetails from "./Component/MajorDetails"
import Balance from './Component/Balance'
import ChainDetails from "./Component/ChainDetails"



function App() {
  const [count, setCount] = useState(0)
  let [buttn,setbuttn] = useState("connect");
  const [web3state,setweb3state] = useState({
    contractInstance:null,
    selectedAccount:null,
    chainId:null,
    balance:null
})
const handleWallet = async()=>{
    try{
      
      console.log(buttn)
      if(buttn=="Disconnect"){
        setweb3state({undefined})
        setbuttn("connect again");
      }else{
        setbuttn("connecting");
      const {contractInstance,selectedAccount,chainId,balance} = await getWeb3State();
        setweb3state({contractInstance,selectedAccount,chainId,balance})
        selectedAccount==undefined?setbuttn("connect again"):setbuttn("Disconnect");
      }

      
    }catch(error){
        console.error(error)
    }
    
}
  return (
    <>
    <div className="Container">
    <div className="nav">
    <Btn className="follow" handleWallet={handleWallet} web3state={web3state} btn={buttn}></Btn>
       <Search></Search>
    </div>
    <ProfileDetails accDetails={web3state} handleWallet={handleWallet} web3state={web3state} btn={buttn}></ProfileDetails>
    <MinorDetails></MinorDetails>
    <MajorDetails></MajorDetails>
    
    <div className="line"></div>
    {/* <div className="content"> */}
    <Balance></Balance>
    {/* </div> */}
    {/* <Btn className="btn" handleWallet={handleWallet} web3state={web3state} btn={buttn}></Btn> */}
<ChainDetails web3state={web3state}></ChainDetails>
    </div>
    </>
  )
}

export default App
