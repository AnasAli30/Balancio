const express = require('express')
const router = express.Router()
const BUser = require('../models/UserSchema')

router.post("/update", async (req, res) => {
    try {
        console.log("Called")
        const { accountAddress } = req.query;
        const { id, image } = req.body;

        // Check if accountAddress is provided
        if (!accountAddress) {
            return res.status(400).json({ message: "Account address is required" });
        }

        // Find user in the database
        const user = await BUser.findOne({ address:accountAddress });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (id) user.id = id;
        if (image) user.image = image;

        // Save updated user
        const data = await user.save()

        console.log(data)

        res.status(200).json({ message: "Update successful" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Update failed" });
    }
});

module.exports = router;
