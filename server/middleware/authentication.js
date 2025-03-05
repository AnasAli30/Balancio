const jwt = require('jsonwebtoken')

export const authentication = (secretkey)=>{
    const token = req.headers['x-access-token']
    console.log(token)
    if(!token){
        res.status(500).json({message:"Authentication Failed"})
    }
    const decoded =  jwt.verify(token,'secretKey')
    req.accountAddress= decoded.accountAddress
    next()

}
module.exports={authentication}