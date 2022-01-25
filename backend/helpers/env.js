const dotenv = require("dotenv");

dotenv.config('.env');

const env = (var_name) => {

    return process.env[var_name];

}

module.exports = env;