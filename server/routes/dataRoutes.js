const express = require('express')
const router = express.Router()
const BUser = require('../models/UserSchema')
const ethers = require("ethers")
const chainsId = require("../constant/chainId.json")
const {getWalletTokenBalancesPrice} = require("../utiles/moralisApi")

router.get("/data", async (req, res) => {
    console.log("called data route")
        try {             
            const {accountAddress} = req.query;
            if (!accountAddress) {
                return res.status(400).json({ message: "Account address is required" });
            }
             const getalltrx =async ()=>{
               const alltrx=[];
               for(let i of chainsId){
                let trx = await getWalletTokenBalancesPrice(accountAddress,i.chainId);
                alltrx.push({name:i.name,trx:trx});
               }
               return alltrx;
             }
            
       
            let data = await getalltrx();
       
          
             const FilterData = data
             .map((name) => {
              return name.trx.map((pro)=>{
               let amt = parseFloat(Number(ethers.formatUnits(pro.balance)).toPrecision(1))
                 if (pro.security_score>80&& amt>0) {
                   let num = Number(pro.usd_price);
         return {
           chain_name:name.name,
           contractAddress: pro.token_address,
           tokenName: pro?.name,
           tokenSymbol: pro?.symbol,
           price: num.toFixed(2),
           img: pro.logo || "https://img.freepik.com/premium-vector/simple-404-error-sign-concept-technical-fault-danger-notice-construction-page-http-response-code-isolated-white-background-flat-style-trend-modern-logo-design-vector-illustration_117142-142.jpg",
           amount: amt,
           PercentChange: pro?.['24hrPercentChange'],
           usd_Value:pro?.usd_value?.toFixed(2)
         };
                 }
               }).filter(Boolean); 
               
             
             }).flat()
             .sort((a, b) => parseFloat(b.usd_Value) - parseFloat(a.usd_Value))
       
             const AllData = data
             .map((name) => {
               let totalamt=0;
               name.trx.map((pro)=>{
                 if (pro.security_score>80) {
       totalamt = totalamt+ pro.usd_value
                 }
               }).filter(Boolean); 
             return {
               name:name.name,
               value:totalamt.toFixed(2)
             }  
             
             }).flat()
             .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
       
             function totalBalance(){
             let total=0;
             AllData.map((pro)=>{
               total =total + Number(pro.value);
             })
             return total;
             }

        res.status(200).json({FilterData:FilterData,AllData:AllData,total:totalBalance()});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Found failed" });
    }

}
)

module.exports = router;
