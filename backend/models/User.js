const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const env = require('../helpers/env');

const usersSchema = mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'The name field is required.', ],
        minLength: [ 4, "The name field needs at least 4 characters." ],
        maxLength: [ 50, "The name field must not exceed 50 characters." ],
    },

    email: {
        type: String,
        required: [ true, 'The email field is required.'],
        unique: true,
        validate: [validator.isEmail, "The email field contains invalid email."],
    },


    password: {
        type: String,
        required: [ true, 'The password field is required.'],
        minLength: [ 8, "The name field needs at least 8 characters."],
        maxLength: [ 20, "The name field must not exceed 20 characters."],
        select: false,
    },

    avater: String,

    password_reset_token: String,
    password_reset_token_expiry: Date,

    created_at: {
        type: Date,
        default: () => new Date(),
    },
    updated_at: Date


});


usersSchema.pre('save', async function(next){

    if(!this.isModified('password')){ return next(); }

    const hash = await bcrypt.hash(this.password, Number(env('BCRYPT_ROUNDS')));

    this.password = hash;
    this.updated_at = new Date();

    return next();

})

usersSchema.methods.checkPassword = async function (string) {
    return await bcrypt.compare(string, this.password)
}


module.exports = mongoose.model('Users', usersSchema);