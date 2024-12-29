import React from 'react'

export default function ContextMenu({position,nftdetail,setisOpen,setnftData,SetisTransOpen}) {
    if(!position.left) return
  return (
     <div className="Context" style={position}>
        <div className='child' onClick={()=>{
         console.log(nftdetail)
         setnftData(nftdetail)
         setisOpen(true)
         }}><i class="fa-solid fa-tag"></i>List for Sale</div>
        <div className='child' onClick={()=>{
         setnftData(nftdetail)
         SetisTransOpen(true)
         }}><i class="fa-solid fa-money-bill-transfer"></i>Transfer</div>
     </div>
  )
}
