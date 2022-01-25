import { Typography } from "@mui/material";
import React from "react";

const CsAlertBox = ({
  show = false,
  heading = "",
  message = "",
  callback,
  onCancel,
}) => {
  return (
    <>
      {show && (
        <div className="cs-alert-box">
          <div className="cs-alert-box-inner">
            <div className="cs-alert-box-content">
              <h6>
                <Typography variant="button">{heading}</Typography>
              </h6>

              <p>
                <Typography variant="body2">{message}</Typography>
              </p>
            </div>
            <div className="cs-alert-box-actions text-right">
              <button className="simple-white-btn" onClick={onCancel}>
                Cancel
              </button>
              <button className="simple-red-btn" onClick={callback}>
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CsAlertBox;
