import express from 'express';
import {
    ServiceProviderSignUp, ServiceProviderSignIn, ServiceProviderForgotPassword, ServiceProviderResetPassword
} from '../controllers/Service Provider Controller.js';


const router = express.Router();


router.post('/signUp', ServiceProviderSignUp);

router.post('/signIn', ServiceProviderSignIn);

router.post('/forgotPassword', ServiceProviderForgotPassword);

router.post('/resetPassword/:randomToken', ServiceProviderResetPassword)


export const serviceProviderRouter = router; 