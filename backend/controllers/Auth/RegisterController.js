const User = require("../../models/User")
const jwt = require("../../helpers/jwt");
const env = require("../../helpers/env");

exports.register = async (requests, response, next) => {

    try{

        const data = await User.create(requests.body);

        const token = new jwt().encrypt("_id", data._id);


        return response.status(200).cookie('_token', token, { 
            expire: new Date() + env('COOKIE_EXPIRE') * 24 * 60 * 60 * 1000 
        }).json({
            status: true,
            data,
            token
        });

    }catch(err){

        let statusCode = 500;
        let errorName = err.name;

        if (errorName == "ValidationError") {
            statusCode = 422; 
        }

        return response.status(statusCode).json({
            status: false,
            type: errorName,
            message: err.message
        });

    }

}