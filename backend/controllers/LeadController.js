const Lead = require("../models/Lead");

exports.allLeads = async (requests, response, next) => {
  const page =
    requests.query.page != "" && !isNaN(requests.query.page)
      ? Number(requests.query.page)
      : 1;
  const per_page = 5;
  const skip = (page - 1) * per_page;

  const data = await Lead.find().sort({ _id: -1 }).limit(per_page).skip(skip);
  const total = await Lead.count();

  const total_pages = Math.ceil(total / 5);

  return response.status(200).json({
    status: true,
    meta: {
      current_url:
        requests.protocol + "://" + requests.get("host") + requests.url,
      pagination: {
        page,
        per_page,
        total,
        total_pages,
      },
    },
    data,
  });
};

exports.createLead = async (requests, response, next) => {
  try {
    const data = await Lead.create(requests.body);

    return response.status(201).json({
      status: true,
      data,
    });
  } catch (error) {
    let errors = {};

    if (error.name === "ValidationError") {
      errors = error.errors;
    }

    return response.status(500).json({
      status: false,
      errors,
      message: error._message,
    });
  }
};

exports.findLead = async (requests, response, next) => {
  Lead.findOne({ lead_id: requests.params.lead_id ?? "--no-id--" })
    .then((data) => {
      if (!data) {
        return response.status(404).json({
          status: false,
          message: `Lead (${requests.params.id}) Not Found`,
        });
      } else {
        return response.status(200).json({
          status: true,
          data,
        });
      }
    })
    .catch((err) => {
      return response.status(404).json({
        status: false,
        message: `Lead (${requests.params.id}) Not Found`,
      });
    });
};

exports.updateLead = async (requests, response, next) => {
  Lead.findOne({ lead_id: requests.params.lead_id ?? "--no-id--" })
    .then((data) => {
      Lead.findOneAndUpdate(
        { lead_id: requests.params.lead_id },
        requests.body,
        {
          new: true,
          runValidators: true,
        }
      )
        .then((data) => {
          return response.status(200).json({
            status: true,
            data,
          });
        })
        .catch((error) => {
          let errors = {};

          if (error.name === "ValidationError") {
            errors = error.errors;
          }

          return response.status(422).json({
            status: false,
            errors,
            message: error.message,
          });
        });
    })
    .catch((error) => {
      return response.status(404).json({
        status: false,
        message: `Lead (${requests.params.id}) Not Found`,
      });
    });
};

exports.deleteLead = async (requests, response, next) => {
  Lead.findOne({ lead_id: requests.params.lead_id ?? "--no-id--" })
    .then((data) => {
      data.remove();

      return response.status(200).json({
        status: true,
        message: `Lead (${requests.params.id}) Deleted`,
      });
    })
    .catch((err) => {
      return response.status(404).json({
        status: false,
        message: `Lead (${requests.params.id}) Not Found`,
      });
    });
};
