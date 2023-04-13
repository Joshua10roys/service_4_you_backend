import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import { SITE_URL } from "../assets/urls.js";
import { sendMail } from "../helpers/nodemailer.js";
import Customer from "../models/customerSchema.js"
import ServiceProvider from "../models/serviceProviderSchema.js";
import Booking from "../models/bookingSchema.js"
import mongoose from "mongoose";


const getId = () => {

    let newDate = new Date();
    let id = newDate.getDate() + "" + (newDate.getMonth() + 1) + "" +
        newDate.getFullYear() + "" + newDate.getHours() + "" +
        newDate.getMinutes() + "" + newDate.getSeconds();
    return id;

}


const postNewDateById = async (request, response) => {

    try {

        let _id = request.params._id;
        let doesIdExist = mongoose.isValidObjectId(_id);

        if (doesIdExist) {

            let id = getId();
            let date = request.body.date;
            let time = request.body.time;

            let checkExist = await Booking.findOne(
                { serviceProviderId: _id, date: date, time: time },
                { _id: 1 }
            );

            if (checkExist) {
                response.status(409).send({ msg: 'Date Already Available' });
            } else {
                let result = await Booking.create({
                    bookingId: id,
                    serviceProviderId: _id,
                    date: date,
                    time: time,
                })
                response.status(200).send({ msg: 'New Available Date Created', result: result });
            }
        } else {
            response.status(400).send({ msg: 'Worng Request' })
        }
    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}


export { postNewDateById };