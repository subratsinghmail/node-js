const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
  name:String,
  gender:String,
  password:String 
})





module.exports = mongoose.model('Users',userSchema);
