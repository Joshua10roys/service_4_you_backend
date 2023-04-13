import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import { SITE_URL } from "../assets/urls.js";
import { sendMail } from "../helpers/nodemailer.js";
import Customer from "../models/customerSchema.js"
import { genHashPassword } from "../helpers/functions.js"


const customerSignUp = async (request, response) => {

    try {

        const { username, password, ...rest } = request.body;
        const doesUsernameExist = await Customer.findOne({ username });

        if (doesUsernameExist) {

            response.status(409).send({ msg: 'Username Already Exist' });

        } else {

            const hashedPassword = await genHashPassword(password);
            await Customer.create({ username: username, password: hashedPassword, ...rest });
            response.status(201).send({ msg: 'Account Created Successfully' });
        }
    } catch (error) {
        response.status(400).send({ msg: 'Something Went Wrong' });
        console.log(error.message);
    }
}

const customerSignIn = async (request, response) => {

    try {

        const { username, password } = request.body;
        const userFromDB = await Customer.findOne({ username });

        if (!userFromDB) {

            response.status(401).send({ msg: "Invalid Credentials" });

        } else {

            const storedPassword = userFromDB.password;
            const isPasswordMatch = await bcrypt.compare(password, storedPassword);

            if (isPasswordMatch) {

                const token = jwt.sign({ _id: userFromDB._id, userType: "customer" }, process.env.PRIVATE_KEY, { expiresIn: "24h" });
                response.status(201).send({ msg: "User Signed-In Successful", token: token, _id: userFromDB._id, userType: "customer" });

            } else {
                response.status(401).send({ msg: "Invalid Credentials" })
            }
        }
    } catch (error) {
        response.status(400).send({ msg: 'Something Went Wrong' });
        console.log(error.message);
    }
}

const customerForgotPassword = async (request, response) => {

    try {

        const { username } = request.body;
        const userFromDB = await Customer.findOne({ username });

        if (!userFromDB) {
            response.status(401).send({ msg: "Username Doesn't Exist" })
        } else {

            const randomString = await cryptoRandomString({ length: 10 });
            let randomToken = await jwt.sign({ randomString }, "reset_key", { expiresIn: '1h' });

            await Customer.findByIdAndUpdate({ _id: userFromDB._id }, { randomToken: randomToken })

            const link = `${SITE_URL}/customer/resetPassword/${randomToken}`;

            sendMail(username,
                "Password Reset Mail",
                '<p>Link to reset your account password</p></b><a href="' + link + '">' + link + '</a>');

            response.status(201).send({ msg: "Password Reset Email Sent" });
        }
    } catch (error) {
        response.status(400).send({ msg: 'Something went wrong' });
        console.log(error.message);
    }
}

const customerResetPassword = async (request, response) => {

    try {

        const randomToken = request.params.randomToken;
        const { password } = request.body;

        jwt.verify(randomToken, "reset_key", async (error, decoded) => {

            if (error) {

                response.status(401).send({ msg: "Password Reset Link Expired" });

            } else if (decoded) {

                const userFromDB = await Customer.findOne({ randomToken: randomToken });

                if (!userFromDB) {
                    response.status(400).send({ msg: "Worng User Request" })
                } else {

                    const hashedPassword = await genHashPassword(password);
                    await Customer.findByIdAndUpdate(userFromDB._id, { password: hashedPassword, randomToken: null });
                    response.status(201).send({ msg: "New Password Updated" });
                }
            }
        })
    } catch (error) {
        response.status(400).send({ msg: 'Something Went Wrong' });
        console.log(error.message);
    }
}


export {
    customerSignUp, customerSignIn, customerForgotPassword, customerResetPassword
};