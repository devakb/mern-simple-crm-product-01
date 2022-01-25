import { CircularProgress, TextField, Typography } from "@mui/material";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";

const Tbody = ({
  isLoading = false,
  errorMessage = null,
  retryCallback = null,
  children,
}) => {
  return (
    <tbody>
      {isLoading && (
        <tr>
          <Td colSpan={"100%"}>
            <div className="fs-14 d-flex align-items-center justify-content-center">
              <CircularProgress color="inherit" size={15} /> &nbsp;&nbsp;
              Loading ...
            </div>
          </Td>
        </tr>
      )}

      {errorMessage != null && (
        <tr>
          <Td colSpan={"100%"} className="text-center">
            <div className="fs-14 d-flex align-items-center justify-content-center">
              {errorMessage}
              {retryCallback != null && (
                <>
                  &nbsp;&nbsp;
                  <button
                    className="simple-white-btn"
                    onClick={() => retryCallback()}
                  >
                    <AiOutlineReload size={15} />
                  </button>
                </>
              )}
            </div>
          </Td>
        </tr>
      )}

      {children}
    </tbody>
  );
};

const Td = ({ children, ...props }) => {
  return (
    <td {...props}>
      <Typography variant="body2" component="span" className="fs-14">
        {children}
      </Typography>
    </td>
  );
};

export default Tbody;
export { Td };
