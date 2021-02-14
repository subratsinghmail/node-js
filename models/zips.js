const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const zips=new Schema({
    type:Schema.Types.ObjectId,
    city:String,
    loc:{
        y:Number,
        x:Number
    },
    pop:Number,
    state:String
})

module.exports=mongoose.model('zips',zips);