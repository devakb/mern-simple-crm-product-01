const errorHandler = require("../helpers/errorHandler");
const jwt = require("../helpers/jwt");
const User = require("../models/User");

exports.authenticate = async (requests, response, next) => {

    try{
 
        const _token = await requests.cookies._token;

        const _id = new jwt().decrypt(_token);

        const user = await User.findOne().and({_id});

  
        if(!user){

            return next(new errorHandler('Unauthorized', 401));

        }else{

            return next();

        }

    }catch(err){

        return next(new errorHandler("Unauthorized", 401));

    }


}