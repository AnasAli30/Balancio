const express = require("express");
const cors = require('cors')
const authentication = require("./routes/authenticationRoutes")
const register = require("./routes/registerRoutes")
const update = require("./routes/updateRoutes")
const upload = require("./routes/uploadRoutes")
const user = require("./routes/userRoutes")
const data = require("./routes/dataRoutes")
const trx= require("./routes/trxdataRoutes")
const nft = require("./routes/nftdataRoutes")
const {initializeMoralis} = require("./utiles/moralisApi")
const app = express();
require('dotenv').config()
const connectDB = require('./db/connect');

app.use(cors())

app.use(express.json())

app.use("/api",authentication);
app.use("/api",register);
app.use("/api",update);
app.use("/api",upload);
app.use("/api",user);
app.use("/api",data);
app.use("/api",trx);
app.use("/api",nft);


app.get("/",(req,res)=>{
    // console.log(data)
    res.send("testing")

})
connectDB(process.env.MONGO_URL).then(()=>{   
    try{
      
        app.listen(3000,async()=>{
            console.log("port active at 3000")
            await initializeMoralis();
        })
        
        }catch(e){
        console.log(e)
        }        
}).catch((error)=>{
    console.log(error)
})

