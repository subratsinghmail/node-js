const tripsController=require('../controllers/trips');
 
const express=require('express')
const router=express.Router();





router.get('/trips',tripsController.getTrips);

module.exports=router;