"use client";

import FlexBox from "@/components/FlexBox";
import { SECURE_WORD_EXPIRATION_TIME_IN_SECONDS } from "@/settings";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInterval } from "react-use";

const SecureWordDisplayStep = ({ secureWord, onNext }) => {
  const [timeLeft, setTimeLeft] = useState(
    SECURE_WORD_EXPIRATION_TIME_IN_SECONDS
  );

  /** Count down to let user know when the secure word will expire */
  useInterval(
    () => {
      setTimeLeft((prev) => prev - 1);
    },
    timeLeft > 0 ? 1000 : null
  );

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
        {timeLeft > 0 && `This secure word will expire in ${timeLeft} seconds`}
        {timeLeft < 1 && "This secure word has expired"}
      </Box>

      <Button variant="contained" sx={{ marginTop: "20px" }} onClick={onNext}>
        Next
      </Button>
    </FlexBox>
  );
};

export default SecureWordDisplayStep;
