const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorDetail = new Schema({
    username: {type: String,required:true},
    email: {type: String,required:true},
    count: {type:Number,required:true,default:0},
    uniqueCount: {type:Number,required:true,default:0},
    weekCount: {type: String,required:true},
    uniqueVistors: {type: String,required:true},
    weeklyUniqueVistors: {type: String,required:true}
},{timestamps:true})

const Visitor = mongoose.model('Visitor',visitorDetail);
module.exports = Visitor;