import React, { useState } from "react";
import axios from "axios";
import { useWeb3Context } from "../context/UseWeb3Context";
import toast from "react-hot-toast";

export default function Profile({address,Image}) {
  if(!Image) {Image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
  const [image, setImage] = useState(Image); // Replace this dynamically if needed

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Convert file to a preview URL (for local display)
    const localUrl = URL.createObjectURL(file);
    setImage(localUrl);

    // Upload to server
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.imageUrl) {
        setImage(response.data.imageUrl);
        updateProfileImage(response.data.imageUrl);
 
      }
    } catch (error) {
      toast.error("Error uploading image");
      console.error("Error uploading image:", error);
    }
  };

  // Function to update image in database
  const updateProfileImage = async (imageUrl) => {
    try {
     const response= await axios.post(`http://localhost:3000/api/update?accountAddress=${address}`, {
        image: imageUrl,
      });
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error("Error updating profile image in DB")
      console.error("Error updating profile image in DB:", error);
    }
  };

  return (
    <div className="Profile">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <img
        src={image}
        alt="Profile"
        onClick={() => document.getElementById("fileInput").click()}
        style={{ cursor: "pointer", width: "100px", borderRadius: "50%" }}
      />
    </div>
  );
}
