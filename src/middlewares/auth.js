import jwt from 'jsonwebtoken';


export function checkToken(request, response) {

    try {
        const auth_token = request.params.auth_token;

        jwt.verify(auth_token, process.env.PRIVATE_KEY, (error, decoded) => {

            if (decoded) {
                response.status(200).send({ msg: "Valid Token", userType: decoded.userType, _id: decoded._id })
            }

            if (error) {
                response.status(400).send({ msg: 'AuthToken Expired' })
            }

        })

    } catch (error) {
        console.log(error);
        response.status(400).send({ msg: 'Something Went Wrong' });
    }
}

export const authCustomer = async (request, response, next) => {

    try {

        let auth_token = request.headers.auth_token;

        if (auth_token) {

            jwt.verify(auth_token, process.env.PRIVATE_KEY, (error, decoded) => {

                if (decoded) {

                    if (decoded.userType === "customer") {
                        next();
                    } else {
                        response.status(401).send({ msg: 'Your Not Authenticated' })
                    }
                } else if (error) {
                    response.status(401).send({ msg: 'Your session expired' })
                }

            })
        } else {
            response.status(401).send({ msg: 'Please Signin to Continue' })
        }

    } catch (error) {
        response.status(400).send({ msg: 'Something Went Wrong' });
        console.log(error.message);
    }
}

export const authServiceProvider = async (request, response, next) => {

    try {

        let auth_token = request.headers.auth_token;

        if (auth_token) {

            jwt.verify(auth_token, process.env.PRIVATE_KEY, (error, decoded) => {

                if (decoded) {

                    if (decoded.userType === "service provider") {
                        next();
                    } else {
                        response.status(401).send({ msg: 'Your Not Authenticated' })
                    }
                } else if (error) {
                    response.status(401).send({ msg: 'Your session expired' })
                }

            })
        } else {
            response.status(401).send({ msg: 'Please Signin to Continue' })
        }

    } catch (error) {
        response.status(400).send({ msg: 'Something Went Wrong' });
        console.log(error.message);
    }
}

export const checkAuthentication = async (request, response, next) => {

    try {

        let auth_token = request.headers.auth_token;

        if (auth_token) {

            jwt.verify(auth_token, process.env.PRIVATE_KEY, (error, decoded) => {

                if (decoded) {

                    if (decoded.userType === "customer" || decoded.userType === "service provider") {
                        next();
                    } else {
                        response.status(401).send({ msg: 'Your Not Authenticated' })
                    }
                } else if (error) {
                    response.status(401).send({ msg: 'Your session expired' })
                }

            })
        } else {
            response.status(401).send({ msg: 'Please Signin to Continue' })
        }

    } catch (error) {
        response.status(400).send({ msg: 'Something Went Wrong' });
        console.log(error.message);
    }
}