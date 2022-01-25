const express = require("express");

// Middleware
const { authenticate } = require("../middleware/authenticate");

// Controllers
const { login, me } = require("../controllers/Auth/LoginController");
const { register } = require("../controllers/Auth/RegisterController");
const {
  allLeads,
  createLead,
  findLead,
  updateLead,
  deleteLead,
} = require("../controllers/LeadController");
const {
  allUsers,
  createUser,
  updateUser,
  showUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

// Non Protected Routes

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").post(me);

// Protected Routes

//router.use(authenticate);

router.route("/users").get(allUsers).post(createUser);
router
  .route("/users/:lead_id")
  .get(showUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/leads").get(allLeads).post(createLead);
router
  .route("/leads/:lead_id")
  .get(findLead)
  .put(updateLead)
  .delete(deleteLead);

module.exports = router;
