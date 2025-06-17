"use client";

import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTimeout, useTimeoutFn } from "react-use";

const SuccessStep = ({ onNext }) => {
  const router = useRouter();

  useTimeoutFn(() => {
    router.replace("/dashboard");
  }, 1000);

  return (
    <Box>
      erre
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
