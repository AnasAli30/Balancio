import React from 'react'
import Profile from './Profile'
import Btn from './Btn';
import axios from 'axios';
import { useState } from 'react';

export default function ProfileDetails({accDetails,totalBalance}) {
  const [inputValue, setInputValue] = useState("");
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

 async function updateid(){
  try {

    const response = await axios.post(
        `http://localhost:3000/api/update?accountAddress=${selectedAccount}`, 
        { id: inputValue} // or { image: "new-image-url.jpg" }
    );
    console.log(response.data);
} catch (error) {
  console.log(error)
    console.error("Error updating user:", error.response?.data || error.message);
}
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        updateid();
    }
}
 
  return (
    <div className="ProfileDetails">
    <Profile address={selectedAccount}></Profile>
    
    <div className="detail">
        <h3 className='id'>No ID</h3>
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown} 
            placeholder="Enter something"
        />
        <span className='address'>
          <p className='add' onClick={copy}>{selectedAccount?selectedAccount:"Not Connected"}</p>
          <span className="tooltip">Click to copy address</span>
          <i class="fa-solid fa-qrcode"></i></span>
        <p className='bio'>This user has not added a bio yet</p>
    </div>
    </div>
  )
}
