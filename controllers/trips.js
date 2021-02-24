const zips=require('../models/zips')
const auth=require('../middleware/isauth');


exports.getTrips=(req,res,next)=>{
 let token=req.get('Authorization');
//  console.log(token);
 if(token){
     let authToken=req.get('Authorization').split(' ')[1];
       console.log(authToken);

     let status=auth.check(authToken);
     if(status!=-1){
        zips.find({}).limit(10).then((result)=>{
            res.status(200).json(result)
        })     
     }else{
         res.status(503).send('You have not been authorized bro')
     }
 }else{
     res.status(500).send('Not autorized')
 }

}