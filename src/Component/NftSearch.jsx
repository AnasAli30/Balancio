import React from 'react'

export default function NftSearch() {
  return (
    <>
    <div className="nftsearch">
        <div className="filter box">
        <i class="fa-solid fa-filter"></i>
        </div>
        <div className="search">
        <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Search by name' />
        </div>
        <div className="sort box">
        <i class="fa-solid fa-sort"></i>
        </div>
        <div className="view box">
        <i class="fa-solid fa-box"></i>
        </div>
    </div>
    </>
  )
}