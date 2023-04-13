import express from 'express';
import { checkToken } from '../middlewares/auth.js';
import { authCustomer, authServiceProvider, checkAuthentication } from '../middlewares/auth.js';
import {
    getServiceList, getStateList, getDistrictList, getCityList, getServiceProviders, getDatesById,
    getServiceProviderDate, getMyBookingById, getMyAppoinmentsById
} from '../controllers/Get Controller.js';


const router = express.Router();


router.get('/checkUser/:auth_token', checkToken);

router.get('/serviceList', getServiceList);

router.get('/stateList', getStateList);

router.get('/districtList/:state', getDistrictList);

router.get('/cityList/:district', getCityList);

router.get('/serviceProviders', getServiceProviders);

router.get('/date/:_id', getDatesById);

router.get('/date', getServiceProviderDate);

router.get('/myBookings/:_id', authCustomer, getMyBookingById);

router.get('/myAppoinments/:_id', authServiceProvider, getMyAppoinmentsById)


export const getRouter = router;