import React from 'react'

export default function NftSearch({search,setShow,show}) {
  return (
    <>
    <div className="nftsearch">
        <div className="filter box"  onClick={()=>{
          if(show){
          setShow(false)}else{
            setShow(true)
          }
        }}>
        <i class="fa-solid fa-filter"></i>
        </div>
        <div className="search">
        <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Search by name' onChange={search} />
        </div>
    </div>
    </>
  )
}
