const express = require('express')
const router = express.Router()
const BUser = require('../models/UserSchema')

router.get("/user", async (req, res) => {
    try {
        console.log("Called")
        const { accountAddress } = req.query;

        // Check if accountAddress is provided
        if (!accountAddress) {
            return res.status(400).json({ message: "Account address is required" });
        }

        // Find user in the database
        const user = await BUser.findOne({ address:accountAddress });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({user});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Found failed" });
    }
});

module.exports = router;
