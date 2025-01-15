import React, { useEffect } from 'react'
import Chain from './Chain'

export default function Loadingchain(){
  const elements = Array.from({ length: 7 });
  return (
  <div className="ChainDetails">
   {elements.map((_, index) => (
        <div className="loadChain" key={index}>
          <div className="img"></div>
          {/* <img src='' alt="" /> */}
          <div className="bal">
            <p className="name"></p>
            <p className="amt"></p>
          </div>
        </div>
      ))}
  </div>
  )
}
