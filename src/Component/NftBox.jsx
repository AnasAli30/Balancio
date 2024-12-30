import React, { useState } from 'react'
import Nft from './Nft'
import ContextMenu from './ContextMenu'
import LiftNft from "./LiftNft"
import MenuTransfer from "./MenuTransfer"
export default function NftBox({Data,state}) {
      let [isOpen,setisOpen] = useState(false);
      let [isTransOpen,SetisTransOpen] = useState(false);
      let [nftData,setnftData] = useState({});
    let [position ,setPosition] = useState({})
    let [nftdetail,Setnftdetail] = useState({})
    console.log(nftdetail)
  return (
    <>
   {isTransOpen?<MenuTransfer data={nftData} SetisTransOpen={SetisTransOpen} state={state}></MenuTransfer>:null}
     {isOpen?<LiftNft data={nftData} setisOpen={setisOpen} state={state}></LiftNft>:""}

    <ContextMenu position={position} setnftData={setnftData} nftdetail={nftdetail} setisOpen={setisOpen} SetisTransOpen={SetisTransOpen} ></ContextMenu>
    {/* <div className='total'>123</div> */}

    <div className="nftbox">
     {Data?.map((pro)=>{
         return <Nft name={pro.name} img={pro.image} collectname={pro.contractName} rare={pro.rank} chain={pro.chain} click={(e)=>{
            if(!position.left){
            setPosition({left:e.clientX-30 , top:e.pageY-630})}else{
                setPosition({})
            }
            Setnftdetail(pro)
        }}/>
      })}
      </div>
    </>
  )
}
