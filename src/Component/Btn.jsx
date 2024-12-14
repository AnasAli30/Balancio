import React from 'react'

export default function Btn({handleWallet,web3state}) {
     return <>
      <input onClick={handleWallet}
            className='btn' type="button" value={web3state.selectedAccount==undefined?"Connect Wallet":"Connected"} />
            </>
}
