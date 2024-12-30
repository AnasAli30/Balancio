import React, { useEffect, useState } from 'react'
import { getNftinfo } from '../utiles/getNftinfo';
import {ethers} from "ethers";
import {listNft} from "../opensea/constants"

export default function LiftNft({setisOpen,data,state}) {
    console.log(state)
    console.log(data)
    let [amount,SetAmount] = useState("");
    let [disable,SetDisable] = useState({backgroundColor:"rgba(146, 123, 251, 0.51)",color:"rgba(232, 232, 235, 0.82)"})
    let [current,Setcurrent] = useState({ backgroundColor: "rgb(123, 123, 251)"})
    let [floor,setFloor] = useState();
    let [fee_data,SetFeedata] = useState();
    let [Listing,SetListing] = useState("Complete listing")

    useEffect(()=>{
        const fetch=async()=>{
 const data1 = await  getNftinfo(data.contract_address);
let floor = ethers.formatUnits((data1.floor_Data.listings[0]?.price?.current?.value))
console.log(data1.collection_data.fees)
setFloor(floor)
SetFeedata(data1.collection_data.fees);
        }
        fetch();
    },[data])
    console.log(fee_data,floor)
    const submit = async (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.classList[0];
        let floor = e.target[2].value
        if (action == "listt") {
            SetListing("Listing....");
            await listNft(data.contract_address, data.token_id, state.signer,floor, fee_data).then((data)=>{
                if(data){
                    console.log(data)
                    SetListing("Your item has been listed!");
                    Setcurrent({
                        backgroundColor:"rgba(160, 199, 105, 0.92)"
                    })
                }else{
                    SetListing("Listing failed , try again!")
                    Setcurrent({
                        backgroundColor:"rgb(255, 20, 20)"
                    })
                }
        
                
            }).catch((error)=>{
                console.log(error);
                SetListing("Listing failed , try again!")
            })
        }
    };
   
  return (
    <div id="popup" className='hidden'>
       
    <div className="ListNft">
    <form action="" onSubmit={submit}>
        <div className="listnav">
            <h3>Quick List</h3>
            <i class="fa-solid fa-xmark close-icon" onClick={()=>{
                setisOpen(false)
            }}></i>
        </div>
        <div className="content">
            <img src={data.image} alt="" />
            <div className="listname">
       <p>
       {data.name}</p>
       <p>{data.contractName}</p>
       </div>
            <div className="listing">
                <p>Listing price</p>
                <div className="eth">{amount==""?"--":amount} ETH</div>
            </div>
            
        </div>
        <div className="line"></div>
        <div className="listprice">
           {floor?<div className='p'>Set a price</div>:""}
            <div className="button">
          { data.topOffer? <button className='trait' onClick={()=>{
                SetAmount(data.topOffer)
            }}><span>Top Offer </span>{data.topOffer} ETH</button>:null}

            {floor?<button className='trait' onClick={()=>{
                SetAmount(floor)
            }}><span>Floor </span>{floor} ETH</button>:""}
            </div>
            <div className='p'>Starting price</div>
           
            <div className="input">
           
                <input type="text" placeholder='Amount' value={amount} onChange={(e)=>{SetAmount(e.target.value)}}/>
                <div className="inputeth">
                    <p>ETH</p>
                </div>
            </div>
            <div className="fee">
                <p>OpenSea fee</p>
                <p>2.5%</p>
            </div>
          {fee_data?<div className="fee">
                <p>Creator earnings</p>
                <p>{fee_data[1]?.fee?fee_data[1]?.fee:"0"}%</p>
            </div>:null}
            <div className="line"></div>
        <div className="earning">
            <p>Total potential earnings</p>
            <p>{amount==""?"--":((amount*0.975).toPrecision(2))} ETH</p>
        </div>
        </div>
      
        <div className="complete">
            <button className='listt' style={amount==""?disable:current} >{Listing}</button>
        </div>
        </form>
    </div>

    </div>
  )
}
