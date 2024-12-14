import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Content from './Component/Content'
import Web3Provider from './context/web3Provider'
import Btn from './Component/Btn'
import { getWeb3State } from './utiles/getWeb3State'

function App() {
  const [count, setCount] = useState(0)
  const [web3state,setweb3state] = useState({
    contractInstance:null,
    selectedAccount:null,
    chainId:null,
    balance:null
})
const handleWallet = async()=>{
    try{
        const {contractInstance,selectedAccount,chainId,balance} = await getWeb3State();
        setweb3state({contractInstance,selectedAccount,chainId,balance})
    }catch(error){
        console.error(error)
    }
    
}
  return (
    <>
    <div className="Container">
    <div className="nav">
      <h1 className='title'>Balancio</h1>
    <Btn className="btn" handleWallet={handleWallet} web3state={web3state}></Btn>
    </div>
    <div className="content">
    <Web3Provider web3state={web3state}>
    <Content></Content>
    </Web3Provider>
    </div>
 

    </div>
   
   
  
    </>
  )
}

export default App
