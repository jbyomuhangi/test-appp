import FlexBox from "@/components/FlexBox";
import { Box, TextField } from "@mui/material";
import React from "react";

const UserNameStep = () => {
  return (
    <FlexBox>
      <Box sx={{ marginBottom: "5px" }}>Enter username:</Box>
      <TextField size="small" placeholder="Username" sx={{ width: "200px" }} />
    </FlexBox>
  );
};

export default UserNameStep;
