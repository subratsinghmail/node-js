const express=require('express');

const authController=require('../controllers/auth')

const router=express.Router();


router.get('/login',authController.getLogin)
router.get('/reset',authController.resetPass)
router.post('/signUp',authController.signup)

module.exports=router

