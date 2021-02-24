
const jwt=require('jsonwebtoken');


exports.check=(token)=>{
     let decoded;
    //using try and catch for the block.
    try{
     decoded=jwt.verify(token,'thisismysecret')
     console.log(decoded,'++++++++++++++');

    } catch(err){
      return -1;
    }

    if(!decoded){
        return -1;
    }else{
       const obj={
           name:decoded.name
       }

       return obj;
    }

    
    
}