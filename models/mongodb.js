const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Auth").then(()=>{
    console.log("mongodb connected");
}).catch((err)=> {
    console.log("connection failed");
    console.log(err);
})


const LoginSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection = new mongoose.model('Collection',LoginSchema)

module.exports = collection