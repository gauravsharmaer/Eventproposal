const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
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
    },
    selectedProposal:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

module.exports = User