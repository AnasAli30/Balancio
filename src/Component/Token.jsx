import React from 'react';

// import innerimg from "../icon/base.png";

export default function Token({img,sym,price,amount,usd,innerimg}) {
  return (
    <>
        <div className="name">
            <div className="img">
            <img src={img} alt="" />
            <div className="innerimg">
                <img src={innerimg} alt="" />
            </div>
            </div> 
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
