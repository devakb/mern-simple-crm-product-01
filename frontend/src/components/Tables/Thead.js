import { Typography } from "@mui/material";
import React from "react";

const Thead = ({ children }) => {
  return <thead>{children}</thead>;
};

const Th = ({ children, ...props }) => {
  return (
    <th {...props}>
      <Typography variant="button" component="span" className="fs-14">
        {children}
      </Typography>
    </th>
  );
};

export default Thead;
export { Th };
