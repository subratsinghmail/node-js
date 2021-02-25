const zips = require("../models/zips");
const auth = require("../middleware/isauth");

exports.getTrips = (req, res, next) => {
  //  console.log(token);

   if(req.isAuth==true){
       let name=req.name;
    zips
    .find()
    .limit(10)
    .then((result) => {
      res.status(200).json({result:result,name:name});
    });
   }else{
       res.status(403).json({message:'Not authorized'})
   }
};


