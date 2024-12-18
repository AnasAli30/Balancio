import React from 'react'
import Profile from './Profile'
import Btn from './Btn';

export default function ProfileDetails({accDetails,handleWallet,web3state,buttn}) {
  let {selectedAccount,chainId,balance} = accDetails;
  function copy(e) {
    const textToCopy = e.target.innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard:", textToCopy);
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  }
 
  return (
    <div className="ProfileDetails">
    <Profile></Profile>
    
    <div className="detail">
        <h3 className='id'>No ID</h3>
        <span className='address'>
          <p className='add' onClick={copy}>{selectedAccount?selectedAccount:"Not Connected"}</p>
          <span className="tooltip">Click to copy address</span>
          <i class="fa-solid fa-qrcode"></i></span>
        <p className='bio'>This user has not added a bio yet</p>
    </div>
    </div>
  )
}
