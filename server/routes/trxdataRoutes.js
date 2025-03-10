const express = require('express')
const router = express.Router()
const BUser = require('../models/UserSchema')
const ethers = require("ethers")
const chainsId = require("../constant/chainId.json")
const {getWalletTokenBalancesPrice} = require("../utiles/moralisApi")
const {getWalletTrx} = require("../utiles/moralisApi")

router.get("/trx", async (req, res) => {
    console.log("called trx route")
        try {             
            const {accountAddress} = req.query;

            const chain = ["0x1","0x2105","0x89"]

            async function fetchtrx(){
             let eth = await getWalletTrx(accountAddress,chain[0])
             eth = eth.map((pro)=>{
                 return {...pro,chain:"ethereum"}
             })
             let base = await getWalletTrx(accountAddress,chain[1])
             base = base.map((pro)=>{
                 return {...pro,chain:"base"}
             })
         
             let poly = await getWalletTrx(accountAddress,chain[2])
             poly = poly.map((pro)=>{
                 return {...pro,chain:"polygon"}
             })
             return [...eth,...base,...poly]
             }
         
           const data  = await fetchtrx();
            const trx= data.filter((pro)=>{
                 return pro.possible_spam==false
             }).sort((a,b)=>{
              return Math.floor(new Date(b.block_timestamp) / 1000) - Math.floor(new Date(a.block_timestamp) / 1000)
             })
           
        res.status(200).json({trx});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "trx failed failed" });
    }

}
)

module.exports = router;
