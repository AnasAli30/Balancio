const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    token:{
        type:String,
        required:true
    }
})

const BUser = mongoose.model("BUser",UserSchema)

module.exports = BUser;