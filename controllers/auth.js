
const User=require('../models/user');
const bcrypt=require('bcryptjs')
const crypto=require('crypto');

exports.postLogin=async(req,res,next)=>{
    //setting a cookie
     let status=await User.findOne({name:req.body.name})
     console.log(status);

}

exports.getLogin=(req,res,next)=>{
    let name1=req.body.name;
    let  password=req.body.password;
      User.findOne({name:name1}).then((response)=>{
          if(response){
              //console.log(response)
              bcrypt.compare(password,response.password).then((match)=>{
                  if(match){
                      res.status(200).send('login successfull')
                  }else res.status(200).send('Wrong password')
              }).catch((err)=>{
                   console.log(err)
                  res.status(200).json({mesage:err})
              })
          }
      })
    

}


exports.signup= async(req,res,next)=>{
    let name=req.body.name;
    let gender=req.body.gender;
    let password=req.body.password;

   //finding a user with an id.
    let check=await User.find({name:name});
              

     if(check==null||check.length==0){
       let hash=await bcrypt.hash(password,12);
     
       const newUser= new User({
          name:req.body.name,
          gender:gender,
          password:hash,
          trips:'572bb8222b288919b68abf66'
      })

        newUser.save().then((result)=>{
            res.status(200).json({message:'New User created successfully',data:result})
        })
        // res.status(200).json({check})
    }else {

        res.status(400).send({message:'User already has an account'})
    }
     //creating logic.


}


exports.resetPass=(req,res,next)=>{
  let name=req.query.name;
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          res.status(500).send('we ran into an error')
      }

      
      
    User.findOne({name}).then((result)=>{
     if(!result){
        res.status(200).send('you arent connected with us.')
     }else{
        const token=buffer.toString('hex');
          result.resetToken=token;
          result.resetTokenExpires=Date.now()+3600000;
         return User.save()
     }


 }).catch()
     console.log('')
  })
    

}



