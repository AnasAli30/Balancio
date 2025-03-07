const express = require('express');
const multer = require('multer');
const router = express.Router();
const BUser = require('../models/UserSchema');

// Set up multer for file uploads (stores in 'uploads/' folder)
const storage = multer.diskStorage({
  destination: "../uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Image Upload Route
router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Generate an image URL (adjust this to your storage method)
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Profile Image Update Route
router.post("/update", async (req, res) => {
  try {
    const { accountAddress } = req.query;
    const { image } = req.body;

    if (!accountAddress) return res.status(400).json({ message: "Account address is required" });

    const user = await BUser.findOne({ address: accountAddress });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.image = image;
    await user.save();

    res.status(200).json({ message: "Profile image updated successfully", imageUrl: user.image });
  } catch (e) {
    console.error("Error updating profile image:", e);
    res.status(500).json({ message: "Failed to update profile image" });
  }
});

module.exports = router;
