const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Cpassword:{
        type:String,
        required:true
    }
},{timestamps:true})

const Vendor = mongoose.model("Vendor",VendorSchema)

module.exports = Vendor