import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import { SITE_URL } from "../assets/urls.js";
import { sendMail } from "../helpers/nodemailer.js";
import Customer from "../models/customerSchema.js"
import ServiceProvider from "../models/serviceProviderSchema.js";
import Booking from "../models/bookingSchema.js"
import mongoose from "mongoose";


const bookService = async (request, response) => {

    try {

        let bookingId = request.body.bookingId;
        let serviceProviderId = request.body.serviceProviderId;
        let customerId = request.body.customerId;
        let address = request.body.address;
        let type = request.body.type;

        let isIdExist = mongoose.isValidObjectId(bookingId);

        if (isIdExist) {
            let result = await Booking
                .findOne({ _id: bookingId, serviceProviderId: serviceProviderId })
                .updateOne({
                    bookingStatus: true,
                    workStatus: 'Booked',
                    customerId: customerId,
                    customerAddress: address,
                    serviceType: type,
                })
            console.log(result);
            response.status(201).send({ msg: 'Booking Successful' })
        } else {
            response.status(400).send({ msg: 'Wrong Request' });
        }


    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

const updateServiceComplete = async (request, response) => {

    try {

        let bookingId = request.params._id;
        let serviceProviderId = request.body.serviceProviderId;
        let customerId = request.body.customerId

        let isValidId = mongoose.isValidObjectId(bookingId);

        if (isValidId) {

            let result = await Booking
                .find({
                    _id: bookingId,
                    serviceProviderId: serviceProviderId,
                    customerId: customerId,
                })
                .updateOne({
                    workStatus: "Completed"
                })

            response.status(200).send({ msg: "Service Completion Updated" })

        } else {
            response.status(400).send({ msg: 'Wrong Request' });
        }

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }

}


export { bookService, updateServiceComplete };