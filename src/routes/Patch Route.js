import express from 'express';
import { authCustomer, authServiceProvider, checkAuthentication } from '../middlewares/auth.js';
import { bookService, updateServiceComplete } from '../controllers/Patch Controller.js';


const router = express.Router();


router.patch('/bookService', authCustomer, bookService);

router.patch('/serviceCompleted/:_id', authServiceProvider, updateServiceComplete);


export const patchRouter = router;