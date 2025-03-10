const express = require('express')
const router = express.Router()
const axios = require("axios")


router.get("/nft", async (req, res) => {
    console.log("called nft route")
        try {             
            const {accountAddress} = req.query;
            
  const fetch=async(chain)=>
    {
      let uri = `https://${chain}.mintify.xyz/api/getOwnerWallet?owner=${accountAddress}&ownerAltAddress&limit=500&page=1&sort=time-desc`;
      const {data} = await axios
      .get(uri);
      const Data = data.data.filter((pro)=>{
        return pro.image && !pro.is_flagged
      })
      const dup =[];
      const nftData = Data.map((pro1)=>{
       
       let count = Data.map((pro2)=>{
        let c=0;
           if( (pro1.contract_address==pro2.contract_address)){
           c++;
           }
        return c;
        }).reduce((pro,index)=>{
          return pro+index;
         },0)
  
       if(!dup.includes(pro1.contract_address)){
        dup.push(pro1.contract_address)
        return ({
          TotalNft :count,
          nft:pro1
        })
      }
      }).filter(Boolean)
      return {nftData,Data};
  }

 const base =await fetch('base')
 .catch(()=>{
  return {
    nftData:[],
    Data:[]
  };
 })
 const eth = await fetch('trade')
 .catch((e)=>{
  return {
    nftData:[],
    Data:[]
  }
 })
 let arr = {nftData:[...base.nftData,...eth?.nftData],Data:[...base.Data,...eth?.Data].sort((a,b)=>b.topOffer - a.topOffer)}

        res.status(200).json({arr});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "trx failed failed" });
    }

}
)

module.exports = router;
