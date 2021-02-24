const tripsController=require('../controllers/trips');
 
const express=require('express')
const router=express.Router();
 //const isAuth=require('../middleware/isauth');




router.get('/trips',tripsController.getTrips);

module.exports=router;