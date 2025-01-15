import React from 'react'
import { Link } from 'react-router'

export default function Balance({web3state}) {
  console.log(web3state)
  return (
    <div className="Balance">
      <Link className='link'  to={'/'}>
        <div className="Portfolio box">Portfolio <div className="underline"></div></div>
        </Link>
        <Link className='link' to={'/nft'} state={{address:web3state.selectedAccount,signer:web3state.signer}}>
        <div className="Nft box">Nft <div className="underline"></div></div>
        </Link>
        <Link className='link' to={'/trx'} state={{address:web3state.selectedAccount,signer:web3state.signer}}>
        <div className="Transaction box">Transaction <div className="underline"></div></div>
        </Link>
    </div>
  )  
}
