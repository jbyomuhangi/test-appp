import FlexBox from "@/components/FlexBox";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const PasswordStep = ({ onNext }) => {
  return (
    <FlexBox>
      <Box sx={{ marginBottom: "5px" }}>Enter password:</Box>
      <TextField size="small" placeholder="Password" sx={{ width: "200px" }} />

      <Button sx={{ marginTop: "10px" }} onClick={onNext}>
        Next
      </Button>
    </FlexBox>
  );
};

export default PasswordStep;
