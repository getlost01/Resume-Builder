const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetail = new Schema({
    username: {type: String,required:true},
    name: {type: String,required:true},
    email: {type: String,required:true},
    college: {type: String,required:true},
    branch: {type: String,required:true},
    yearOfGrad: {type: Number,required:true},
    jsonData: {type: String,required:true}
},{timestamps:true})

const User = mongoose.model('User',userDetail);
module.exports = User;