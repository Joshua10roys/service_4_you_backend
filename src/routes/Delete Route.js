import express from 'express';
import { authCustomer, authServiceProvider, checkAuthentication } from '../middlewares/auth.js';
import { deleteBookingById } from '../controllers/Delete Controller.js';


const router = express.Router();


router.delete('/bookingDate/:_id', authServiceProvider, deleteBookingById);


export const deleteRouter = router;