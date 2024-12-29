import React from 'react'
import {useState} from "react"
import {transfer} from "../opensea/transfer"
export default function MenuTransfer({SetisTransOpen,data,state}) {
    let [amount,SetAmount] = useState("");
     let [disable,SetDisable] = useState({backgroundColor:"rgba(146, 123, 251, 0.51)",color:"rgba(232, 232, 235, 0.82)"})
    let [current,Setcurrent] = useState({ backgroundColor: "rgb(123, 123, 251)"})
    let [status,setstatus] = useState("Transfer")

    const submit =async(e)=>{
e.preventDefault();
let receipt = e.target[0].value;
setstatus("Transfering.....")
await transfer(state.signer,data.contract_address,state.address,receipt,data.token_id).then((data)=>{
    console.log(data);
    if(data){
        setstatus("Transfer Success")
        Setcurrent({
            backgroundColor:"rgba(160, 199, 105, 0.92)"
        })
    }else{
        setstatus("Transfer Failed , try again!")
        Setcurrent({
            backgroundColor:"rgb(255, 20, 20)"
        })
    }
})
    }


  return (
    <div id="popup" className='hidden'>
        <div className="MenuTransfer">
        <div className="transnav">
            <h3>Transfer</h3>
            <i class="fa-solid fa-xmark close-icon" onClick={()=>{
                SetisTransOpen(false)
            }}></i>
        </div>
         <img src={data.image} alt="" />
         <p>Transfer "{data.name}" to:</p>
         <form action="" onSubmit={submit}>
         <div className="input">
            <input type="text" placeholder='e.g. 0x1ed3... or 0xanas.eth, anas.sol' value={amount} onChange={(e)=>{SetAmount(e.target.value)}}/>
         </div>
         <button className='listt' style={amount==""?disable:current}>{status}</button>
         </form>
        </div>
        </div>
  )
}
