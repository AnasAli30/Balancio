import React from 'react'
import { Link } from 'react-router'

export default function Balance() {
  return (
    <div className="Balance">
      <Link className='link'  to={'/'}>
        <div className="Portfolio box">Portfolio <div className="underline"></div></div>
        </Link>
        <Link className='link' to={'/nft'}>
        <div className="Nft box">Nft <div className="underline"></div></div>
        </Link>
        <Link className='link' to={'/trx'}>
        <div className="Transaction box">Transaction <div className="underline"></div></div>
        </Link>
    </div>
  )  
}
