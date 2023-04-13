import express from 'express';
import {
    customerSignUp, customerSignIn, customerForgotPassword, customerResetPassword
} from '../controllers/Customer Controller.js';


const router = express.Router();


router.post('/signUp', customerSignUp);

router.post('/signIn', customerSignIn);

router.post('/forgotPassword', customerForgotPassword);

router.post('/resetPassword/:randomToken', customerResetPassword);


export const customerRouter = router;