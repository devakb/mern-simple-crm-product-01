const mongoose = require("mongoose");
const validator = require("validator");
const randomText = require("../helpers/randomText");
const leadSchema = mongoose.Schema(
  {
    lead_id: {
      type: String,
      default: "lead_" + randomText(20),
    },

    salutation: String,

    first_name: String,

    last_name: {
      type: String,
      required: [true, "The last name field is required."],
    },

    status: {
      type: String,
      required: [true, "The status field is required."],
      default: "active",
    },

    email: {
      type: String,
      validate: [validator.isEmail, "The email field contains invalid email."],
    },

    phone_number: String,

    source: String,

    address: {
      street: {
        type: String,
        required: [true, "The street field is required."],
      },

      city: {
        type: String,
        required: [true, "The city field is required."],
      },

      state: {
        type: String,
        required: [true, "The state field is required."],
      },

      zip: {
        type: String,
        required: [true, "The zip field is required."],
      },

      country: {
        type: String,
        required: [true, "The country field is required."],
      },
    },

    social: [
      {
        name: {
          type: String,
          required: true,
        },
        profile_url: {
          type: String,
          required: true,
          validate: [validator.isURL, "The email field contains invalid url."],
        },
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Lead", leadSchema);
