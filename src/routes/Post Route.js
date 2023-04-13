import express from 'express';
import { authCustomer, authServiceProvider, checkAuthentication } from '../middlewares/auth.js';
import { postNewDateById } from '../controllers/Post Controllers.js';

const router = express.Router();


router.post('/date/:_id', authServiceProvider, postNewDateById);


export const postRouter = router;