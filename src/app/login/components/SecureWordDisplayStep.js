import FlexBox from "@/components/FlexBox";
import { Box, Button } from "@mui/material";
import React from "react";

const SecureWordDisplayStep = ({ secureWord, onNext }) => {
  return (
    <FlexBox>
      <Box
        component="p"
        sx={{ marginBottom: "5px", fontSize: "2rem", fontWeight: "bold" }}
      >
        Your Secure word is:
      </Box>

      <Box component="p" sx={{ wordBreak: "break-word" }}>
        {secureWord}
      </Box>

      <Button variant="contained" sx={{ marginTop: "20px" }} onClick={onNext}>
        Next
      </Button>
    </FlexBox>
  );
};

export default SecureWordDisplayStep;
