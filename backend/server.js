const express = require("express");
const cookieParser = require("cookie-parser");
const app = require("./app");
const { connectDatabase } = require("./helpers/connectDatabase");
const env = require("./helpers/env");
const { errorsMiddleware } = require("./middleware/errorsMiddleware");
const router = require("./routes/web");
const cors = require("cors");

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/", router);

app.use(errorsMiddleware);

connectDatabase();

app.listen(env("SERVER_PORT"), () => {
  console.log(`Server running on: http://localhost:${env("SERVER_PORT")}`);
});
