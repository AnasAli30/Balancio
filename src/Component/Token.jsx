import React from 'react'

export default function Token({img,sym,price,amount,usd}) {
  return (
    <>
        <div className="name">
            <img src={img} alt="" />
            <span>{sym}</span>
        </div>
        <div className="price">
            ${price}
        </div>
        <div className="Amount">
            {amount}
        </div>
        <div className="usd">
            ${usd}
        </div>
        </>
  )
}
