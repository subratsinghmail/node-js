
const User=require('../models/user');
const bcrypt=require('bcryptjs')


exports.postLogin=async(req,res,next)=>{
    //setting a cookie
     let status=await User.findOne({name:req.body.name})
     console.log(status);

}

exports.getLogin=(req,res,next)=>{
    let name=req.body.email;
    let email=req.body.password;
    

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


}

