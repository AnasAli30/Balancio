import React from 'react'

import base from "../icon/base.png"

export default function Chain({img,name,amt,percent}) {
  return (
   <div className="Chain">
    <img src={base} alt="" />
    <div className="bal">
    <p className='name'>{name}</p>
    <p className='amt'>${amt} <span>33%</span></p>
    </div>
   </div>
  )
}
