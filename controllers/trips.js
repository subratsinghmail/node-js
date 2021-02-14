const zips=require('../models/zips')



exports.getTrips=(req,res,next)=>{

    console.log(JSON.stringify(req.body.n))

 zips.find({}).limit(10).then((result)=>{
     res.status(200).json(result)
 })

 


}