const User = require("../../models/User");
const jwt = require("../../helpers/jwt");
const env = require("../../helpers/env");
const bcrypt = require("bcryptjs");
const errorHandler = require("../../helpers/errorHandler");

exports.login = async (requests, response, next) => {
  const data = await User.findOne()
    .and({
      email: requests.body.email ?? "-no-email-",
    })
    .select("+password");

  if (!data) {
    return next(new errorHandler("Invalid email address or password", 401));
  }

  const checkedPassword = await data.checkPassword(
    requests.body.password ?? "-no-password-"
  );

  if (!checkedPassword) {
    return next(new errorHandler("Invalid email address or password", 401));
  }

  const token = new jwt().encrypt("_id", data._id);

  return response
    .status(200)
    .cookie("_token", token, {
      expire: new Date() + env("COOKIE_EXPIRE") * 24 * 60 * 60 * 1000,
    })
    .json({
      status: true,
      data,
      token,
    });
};

exports.me = async (requests, response, next) => {
  const token = requests.cookies._token;

  if (!token) {
    return next(new errorHandler("Token not given with request", 401));
  }

  const data = await new jwt().decrypt(token);

  if (!data) {
    return next(new errorHandler("Invalid login token", 401));
  }

  const user = await User.findById(data._id);

  if (!user) {
    return next(new errorHandler("User not found", 401));
  }

  return response.status(200).json({
    status: true,
    message: "User Authenticated",
  });
};
