const jsonwebtoken = require("jsonwebtoken");
const env = require("./env");

class jwt
{

    encrypt(key, value){

        let options = {};

        options = {...key};

        options[key] = value;

        return jsonwebtoken.sign(options, env("JWT_SECRET_KEY"), {
            expiresIn: env('JWT_TOKEN_EXPIRE')
        });

    }



    decrypt(_token){

        return jsonwebtoken.verify(_token, env("JWT_SECRET_KEY"));

    }



}


module.exports = jwt;