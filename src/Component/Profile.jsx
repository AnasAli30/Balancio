import React, { useState } from "react";
import axios from "axios";

export default function Profile({address}) {
  const [image, setImage] = useState("https://static.debank.com/image/user/logo/0x83cbb78bc4f870651bfc8dd898f2a43bc0553ac8/ad856a820ddd0694e61332aafa9a136c_thumbnail.png"); // Replace this dynamically if needed

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
      console.error("Error uploading image:", error);
    }
  };

  // Function to update image in database
  const updateProfileImage = async (imageUrl) => {
    try {
      await axios.post(`http://localhost:3000/api/update?accountAddress=${address}`, {
        image: imageUrl,
      });
    } catch (error) {
      console.log(error)
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
