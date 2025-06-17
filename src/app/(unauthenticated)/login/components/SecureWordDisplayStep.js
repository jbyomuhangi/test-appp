"use client";

import FlexBox from "@/components/FlexBox";
import { Box, Button } from "@mui/material";

const SecureWordDisplayStep = ({ secureWord, secureWordTimeout, onNext }) => {
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

      <Box
        component="p"
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          marginTop: "10px",
          color: "red",
        }}
      >
        {secureWordTimeout > 0 &&
          `This secure word will expire in ${secureWordTimeout} seconds`}

        {secureWordTimeout < 1 && "This secure word has expired"}
      </Box>

      <Box
        sx={{ marginTop: "40px", display: "flex", justifyContent: "center" }}
      >
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </FlexBox>
  );
};

export default SecureWordDisplayStep;
