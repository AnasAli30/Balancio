import React, { useState } from "react";
import Profile from "./Profile";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfileDetails({ accDetails, totalBalance, userData }) {
  const [inputValue, setInputValue] = useState(userData?.user?.id || "No ID");
  const [prevValue, setPrevValue] = useState(userData?.user?.id || ""); // Store previous value
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  let { selectedAccount } = accDetails;

  function copy(e) {
    const textToCopy = e.target.innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success("copied to clipboard", textToCopy))
      .catch(err => console.error("Failed to copy text: ", err));
  }

  async function updateId() {
    if (!inputValue.trim()) {
      setError("ID cannot be empty!");
      return;
    }
    if (inputValue === prevValue) {
      setIsEditing(false); // Close edit mode if value is unchanged
      return;
    }

    setError(""); // Clear any previous error

    try {
      const response = await axios.post(
        `http://localhost:3000/api/update?accountAddress=${selectedAccount}`,
        { id: inputValue }
      );
      toast.success(response?.data?.message)
      // console.log(response.data.message)
      setPrevValue(inputValue); 
      setIsEditing(false); // Switch back to h3 after updating
    } catch (error) {
      toast.error("Error updating Profile")
      console.error("Error updating user:", error.response?.data || error.message);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateId();
    }
  };

  return (
    <div className="ProfileDetails">
      <Profile address={selectedAccount} Image={userData?.user?.image} />
      <div className="detail">
        {isEditing ? (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={updateId}
              autoFocus

              className="idinput"
            />
            {error && <p className="error-text">{error}</p>}
          </>
        ) : (
          <h3 className="id" onClick={() => setIsEditing(true)}>
            {inputValue} <i className="fa-solid fa-pen edit-icon"></i>
          </h3>
        )}

        <span className="address">
          <p className="add" onClick={copy}>{selectedAccount ? selectedAccount : "Not Connected"}</p>
          <span className="tooltip">Click to copy address</span>
          <i className="fa-solid fa-qrcode"></i>
        </span>
        <p className="bio">This user has not added a bio yet</p>
      </div>
    </div>
  );
}
