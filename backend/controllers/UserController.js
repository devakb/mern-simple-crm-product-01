const User = require("../models/User")
const jwt = require("../helpers/jwt");
const env = require("../helpers/env");

// GET
exports.allUsers = async (requests, response, next) => {

    let data = await User.find()

    return response.status(200).json({
        status: true,
        data
    });


}


// CREATE
exports.createUser = async (requests, response, next) => {

    try{
        let data = await User.create(requests.body);

        const _token = new jwt().encrypt('_id', data.id);

        return response.status(201).json({
            status: true,
            data,
            _token
        });

    }catch(err){

        return response.status(422).send({
            status: false,
            message: err.message
        });

    }

}


// UPDATE
exports.updateUser = async (requests, response, next) => {

    // Check User Exist or Not
    try{

        let data = await User.findById(requests.params.id);

    }catch{

        return response.status(404).json({
            status: false,
            data: "User Not Found"
        }); 

    }

    // Updating User

    try{

        data = await User.findByIdAndUpdate(requests.params.id, requests.body, {
            new: true,
            runValidators: true,
        });

        return response.status(200).json({
            status: true,
            data
        });

    }catch(err){

        return response.status(500).send({
            status: false,
            message: err.message
        });

    }


}


// ShOW
exports.showUser = async (requests, response, next) => {

    // Check User Exist or Not
    try{

        let data = await User.findById(requests.params.id);

        return response.status(200).json({
            status: true,
            data
        });


    }catch{

        return response.status(404).json({
            status: false,
            data: "User Not Found"
        }); 

    }

}


// DELETE
exports.deleteUser = async (requests, response, next) => {

    // Check User Exist or Not
    try{

        let data = await User.findById(requests.params.id);

        data.remove();

        return response.status(200).json({
            status: true,
            message: "User Successfully Deleted"
        });

    }catch{

        return response.status(404).json({
            status: false,
            data: "User Not Found"
        }); 

    }



}