import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const SubmitButton = ({
  processing,
  processingText = "Submitting",
  children,
  ...props
}) => {
  return (
    <>
      <button
        className="simple-blue-btn d-inline-flex align-items-center"
        type="submit"
        {...props}
        disabled={processing}
      >
        {processing && (
          <span className="d-inline-flex align-items-center">
            <CircularProgress size={14} style={{ color: "white" }} />{" "}
            &nbsp;&nbsp;
          </span>
        )}
        {children}
      </button>
    </>
  );
};

export default SubmitButton;
