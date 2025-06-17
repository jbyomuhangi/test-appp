"use client";

import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const SuccessStep = ({ onNext }) => {
  return (
    <Box>
      <Box
        component="p"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "green",
          textAlign: "center",
        }}
      >
        Login successful!
      </Box>
    </Box>
  );
};

export default SuccessStep;
