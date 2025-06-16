import FlexBox from "@/components/FlexBox";
import { Box, TextField } from "@mui/material";
import React from "react";

const PasswordStep = () => {
  return (
    <FlexBox>
      <Box sx={{ marginBottom: "5px" }}>Enter password:</Box>
      <TextField size="small" placeholder="Password" sx={{ width: "200px" }} />
    </FlexBox>
  );
};

export default PasswordStep;
