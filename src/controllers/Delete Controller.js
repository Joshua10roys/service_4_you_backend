import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import { SITE_URL } from "../assets/urls.js";
import { sendMail } from "../helpers/nodemailer.js";
import Customer from "../models/customerSchema.js"
import ServiceProvider from "../models/serviceProviderSchema.js";
import Booking from "../models/bookingSchema.js"
import mongoose from "mongoose";


async function deleteBookingById(request, response) {

    try {

        let _id = request.params._id;
        let isValidId = mongoose.isValidObjectId(_id);

        if (isValidId) {

            await Booking.findByIdAndDelete(_id);
            response.status(202).send({ msg: 'Date Seleted Successfully' })

        } else {
            response.status(400).send({ msg: 'Worng Request' })
        }

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

export { deleteBookingById };