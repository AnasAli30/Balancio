const express = require('express')
const router = express.Router()
const {ethers} = require('ethers')
const BUser =  require('../models/UserSchema')
const jwt = require('jsonwebtoken')
const { edgelessTestnet } = require('@reown/appkit/networks')

router.post("/register",async(req,res)=>{
    try{
        const {accountAddress} =req.query;
        const {token} = req.body;
        await BUser.create({
          address:accountAddress,
          token:token
      }).then((Data)=>{
          console.log(Data);
      }).catch((e)=>{
          console.log(e)
      })
        res.status(200).json({message:"Registration successFull"})
    }catch(e){
      console.log(e)
      res.status(500).json({message:"Registration failed"})
    }
})

module.exports = router;