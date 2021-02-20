const express=require('express');

const authController=require('../controllers/auth');

const router=express.Router();

router.get('/reset',authController.resetPass);
router.post('/resetPassword',authController.reset);

module.exports=router;