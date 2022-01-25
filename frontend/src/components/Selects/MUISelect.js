import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";

const MUISelect = ({ children, label, ...props }) => {
  const id = "MUISelect-" + Math.random().toString(36).substr(2, 9);

  return (
    <FormControl fullWidth>
      <InputLabel id={id + "-label"}>{label}</InputLabel>
      <Select labelId={id + "-label"} label={label} {...props} id={id}>
        {children}
      </Select>
    </FormControl>
  );
};

export default MUISelect;
