const express = require("express");
const cors = require('cors')
const authentication = require("./routes/authenticationRoutes")
const app = express();


app.use(cors())

app.use(express.json())

app.use("/api",authentication);


app.get("/",(req,res)=>{
    console.log(data)
    res.send("testing")

})

try{
    
app.listen(3000,()=>{
    console.log("port active at 3000")
})

}catch(e){
console.log(e)
}
