const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const userSchema=new Schema({
  name:String,
  gender:String,
  password:String,
  trips:{
    type:Schema.Types.ObjectId,
    ref:'zips'
  },
  resetToken:String,
  resetTokenExpires:Date
})






module.exports = mongoose.model('Users',userSchema);
