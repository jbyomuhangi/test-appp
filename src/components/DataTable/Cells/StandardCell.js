import { Box } from "@mui/material";
import React from "react";

const StandardCell = ({ data }) => {
  return <Box component="p">{data || "-"}</Box>;
};

export default StandardCell;
