import { Alert, Grid, Typography } from "@mui/material";
import SubmitButton from "../../../../components/Buttons/SubmitButton";
import SimpleSelect from "../../../../components/Selects/SimpleSelect";
import SimpleInputBox from "../../../../components/TextFields/SimpleInputBox";
import React from "react";

const ActionForm = ({
  data,
  setData,
  errors,
  errorMessage,
  processing,
  callback,
}) => {
  return (
    <form onSubmit={callback}>
      <div className="container">
        <div className="d-flex justify-content-end">
          <SubmitButton
            processing={processing}
            processingText="Saving ..."
            children="Submit Lead"
          />
        </div>
      </div>

      <div className="simple-action-form mb-5">
        <div className="simple-action-form-inner-box">
          <div className="form-box">
            {Object.keys(errors).length === 0 && (
              <>
                {errorMessage != null && (
                  <Alert severity="error" className="mb-4">
                    {errorMessage}
                  </Alert>
                )}
              </>
            )}
            <Typography variant="h6" component="div" className="text-dark mb-3">
              General Information
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <SimpleSelect
                  disabled={processing}
                  errorMessage={
                    errors.salutation ? errors.salutation.message : ""
                  }
                  label="Salutation"
                  name="salutation"
                  value={data.salutation ?? ""}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                >
                  <option value="">Please Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </SimpleSelect>
              </Grid>

              <Grid item xs={12}>
                <SimpleInputBox
                  type="text"
                  label="First Name"
                  disabled={processing}
                  errorMessage={
                    errors.first_name ? errors.first_name.message : ""
                  }
                  name="first_name"
                  value={data.first_name ?? ""}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleInputBox
                  type="text"
                  label="Last Name"
                  disabled={processing}
                  errorMessage={
                    errors.last_name ? errors.last_name.message : ""
                  }
                  name="last_name"
                  value={data.last_name ?? ""}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <SimpleInputBox
                  type="email"
                  label="Email Address"
                  disabled={processing}
                  errorMessage={errors.email ? errors.email.message : ""}
                  name="email"
                  value={data.email ?? ""}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleInputBox
                  type="tel"
                  label="Phone Number"
                  disabled={processing}
                  errorMessage={
                    errors.phone_number ? errors.phone_number.message : ""
                  }
                  name="phone_number"
                  value={data.phone_number ?? ""}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <SimpleSelect
                  disabled={processing}
                  errorMessage={errors.status ? errors.status.message : ""}
                  label="Status"
                  name="status"
                  value={data.status ?? "Active"}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </SimpleSelect>
              </Grid>
              <Grid item xs={12}>
                <SimpleInputBox
                  type="tel"
                  label="Source"
                  disabled={processing}
                  required={true}
                  errorMessage={errors.source ? errors.source.message : ""}
                  name="source"
                  value={data.source ?? ""}
                  onChange={(e) => setData(e.target.name, e.target.value)}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" component="div" className="text-dark my-3">
              Address Information
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <SimpleInputBox
                  disabled={processing}
                  errorMessage={
                    errors["address"] ? errors["address.street"].message : ""
                  }
                  label="Street Address"
                  type="text"
                  name="street"
                  value={data.address ? data.address.street ?? "" : ""}
                  onChange={(e) =>
                    setData({
                      address: {
                        [e.target.name]: e.target.value,
                        ...data.address,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleInputBox
                  disabled={processing}
                  errorMessage={
                    errors["address"] ? errors["address.city"].message : ""
                  }
                  label="City"
                  type="text"
                  name="city"
                  value={data.address ? data.address.city ?? "" : ""}
                  onChange={(e) =>
                    setData({
                      address: {
                        [e.target.name]: e.target.value,
                        ...data.address,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleInputBox
                  disabled={processing}
                  errorMessage={
                    errors["address"] ? errors["address.state"].message : ""
                  }
                  label="State"
                  type="text"
                  name="state"
                  value={data.address ? data.address.state ?? "" : ""}
                  onChange={(e) =>
                    setData({
                      address: {
                        [e.target.name]: e.target.value,
                        ...data.address,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleInputBox
                  disabled={processing}
                  errorMessage={
                    errors["address"] ? errors["address.zip"].message : ""
                  }
                  label="Zip"
                  type="text"
                  name="zip"
                  value={data.address ? data.address.zip ?? "" : ""}
                  onChange={(e) =>
                    setData({
                      address: {
                        [e.target.name]: e.target.value,
                        ...data.address,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleInputBox
                  disabled={processing}
                  errorMessage={
                    errors["address"] ? errors["address.country"].message : ""
                  }
                  label="Country"
                  type="text"
                  name="country"
                  value={data.address ? data.address.country ?? "" : ""}
                  onChange={(e) =>
                    setData({
                      address: {
                        [e.target.name]: e.target.value,
                        ...data.address,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ActionForm;
