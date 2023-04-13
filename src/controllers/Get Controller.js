import mongoose from "mongoose";
import { getOnlyDate } from "../helpers/functions.js";
import Booking from "../models/bookingSchema.js"
import ServiceProvider from "../models/serviceProviderSchema.js";


async function getServiceList(request, response) {

    try {
        let result = await ServiceProvider.find({}, { _id: 0, serviceType: 1 }).distinct('serviceType');
        response.status(200).send({ msg: 'List of Available Services', serviceList: result });
    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

async function getStateList(request, response) {

    try {

        let result = await ServiceProvider.find({}, { _id: 0, state: 1 }).distinct('state');
        response.status(200).send({ msg: 'List of Available States', stateList: result });

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

async function getDistrictList(request, response) {

    try {

        let state = request.params.state;
        let result = await ServiceProvider.find({ state: { $regex: state, $options: "i" } }, { _id: 0, district: 1 }).distinct('district');
        response.status(200).send({ msg: `List of Available District in ${state}`, districtList: result });

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

async function getCityList(request, response) {

    try {

        let district = request.params.district;
        let result = await ServiceProvider.find({ district: { $regex: district, $options: "i" } }, { _id: 0, city: 1 }).distinct('city');
        response.status(200).send({ msg: `List of Available Cities in ${district}`, cityList: result });

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

async function getServiceProviders(request, response) {

    try {

        let service = request.query.service;
        let state = request.query.state;
        let district = request.query.district;
        let city = request.query.city;
        let rating = request.query.rating;

        let result = await ServiceProvider.find(
            {
                serviceType: { $regex: service, $options: "i" },
                state: { $regex: state, $options: "i" },
                district: { $regex: district, $options: "i" },
                city: { $regex: city, $options: "i" },
                rating: { $gt: rating }
            },
            {
                firstName: 1, lastName: 1, about: 1, serviceType: 1,
                city: 1, district: 1, state: 1, rating: 1,
            }
        );
        response.status(200).send({ msg: "List of Service Providers", result: result })

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

async function getDatesById(request, response) {

    try {

        let _id = request.params._id;
        let isValidId = mongoose.isValidObjectId(_id);

        if (isValidId) {
            let result = await Booking.find(
                { serviceProviderId: _id, date: { $gte: new Date() } },
                { bookingStatus: 1, date: 1, time: 1 }
            );
            response.status(200).send({ dateList: result });
        } else {
            response.status(400).send({ msg: 'Wrong Request' });
        }

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }

}

async function getServiceProviderDate(request, response) {

    try {

        let serviceProviderId = request.query.serviceProvider;

        let result = await Booking.find(
            { serviceProviderId: serviceProviderId, bookingStatus: false, date: { $gte: new Date() } },
            { date: 1, time: 1 }
        );
        response.status(200).send({ dateList: result });

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }

}

async function getMyBookingById(request, response) {

    try {

        let customerId = request.params._id;

        let isValidId = mongoose.isValidObjectId(customerId);

        if (isValidId) {

            let status = request.query.status;
            let type = request.query.service;
            let fromDate = await getOnlyDate(request.query.fromDate);
            let toDate = await getOnlyDate(request.query.toDate);

            let result = await Booking.find(
                {
                    customerId: customerId,
                    workStatus: { $regex: status, $options: "i" },
                    date: { $gte: fromDate, $lte: toDate },
                    serviceType: { $regex: type, $options: "i" },
                },
                {
                    createdAt: 0,
                })
                .populate('serviceProviderId', 'firstName lastName contactNumber');

            response.status(200).send({ msg: 'List of Service Booked', myBookingList: result })

        } else {
            response.status(400).send({ msg: 'Wrong Request' });
        }

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }

}

async function getMyAppoinmentsById(request, response) {

    try {

        let serviceProviderId = request.params._id;

        let isValidId = mongoose.isValidObjectId(serviceProviderId);

        if (isValidId) {

            let status = request.query.status;
            let fromDate = await getOnlyDate(request.query.fromDate);
            let toDate = await getOnlyDate(request.query.toDate);

            let result = await Booking.find(
                {
                    serviceProviderId: serviceProviderId,
                    workStatus: { $regex: status, $options: "i" },
                    date: { $gte: fromDate, $lte: toDate },
                },
                {
                    createdAt: 0, serviceType: 0
                })
                .populate('customerId', 'firstName lastName contactNumber');

            response.status(200).send({ msg: 'List of Service Booked', myBookingList: result })

        } else {
            response.status(400).send({ msg: 'Wrong Request' });
        }

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }

}


export {
    getServiceList, getStateList, getDistrictList, getCityList,
    getServiceProviders, getDatesById, getServiceProviderDate, getMyBookingById, getMyAppoinmentsById
}