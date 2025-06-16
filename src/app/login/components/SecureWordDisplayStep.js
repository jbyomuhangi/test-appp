import FlexBox from "@/components/FlexBox";
import { Box } from "@mui/material";
import React from "react";

const SecureWordDisplayStep = () => {
  return (
    <FlexBox>
      <Box sx={{ marginBottom: "5px" }}>Your Secure word is:</Box>

      <Box>Hello world</Box>
    </FlexBox>
  );
};

export default SecureWordDisplayStep;
