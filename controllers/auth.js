const User = require('../models/user');
const crytpo = require('crypto');



exports.resetPass = async (req, res, next) => {

    let name = req.body.name;
    let status = await User.findOne({ name: name })
    //mongo db always resturns null if it does not find data to be present there.
    if (status == null) {
        res.status(200.).json({ status: 0, message: 'You arent Registered with us.' });
    } else {
    

      let crpt=crytpo.randomBytes(32);
     // console.log(crpt.toString('hex'))
      status.resetToken=crpt;
        let token=crpt.toString('hex')
        let expiry=Date.now()+3600000;
      
      User.findOneAndUpdate({name:name},{resetToken:token,resetTokenExpires:expiry}).then((result)=>{
          res.status(200).json({message:'data updated successfull', data:result})
      }).catch((err)=>{
          res.send('Error in updating the user.')
      })



        
        //updating the user if th


    }
   
}


exports.reset=async(req,res,next)=>{

    let token=req.query.token;
    let name=req.query.token;
    
    
    // User.findOne({resetToken:token,resetTokenExpires:{$gt:Date.now()}}).then((result)=>{
       
    //     return User.updateOne({resetToken:token},{password:req.body.password})

    // }).then((result)=>{
    //     res.status(200).json({message:'password chnaged successfyll',data:result})
    // })
    
    try{
    let  status=await User.findOne({resetToken:token,resetTokenExpires:{ $gt:Date.now()}})
    console.log(status)
     if(status!=null){
         let status=await User.updateOne({resetToken:token},{password:req.body.password})
         res.status(200).json({status:status})
     }else{
         res.status(200).send('no user found')
     }

    }catch{
     console.log('there is a bug in you code')
    }
    
       

}


exports.login=(req,res,next)=>{
 let name=req.body.name;
   User.findOne({name:name}).select("-password").then((user)=>{
    res.status(200).json({user})

   }).catch((err)=>{
       const error=new Error('there seems to be problem')
       error.status=503;
       throw error;
   })

}