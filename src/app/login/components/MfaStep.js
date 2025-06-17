"use client";

import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const MfaStep = ({ username, onNext }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const mfaMutation = useMutation({
    mutationFn: async ({ username, code }) => {
      const res = await fetch("/api/verifyMfa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, code }),
      });

      const { data, error } = await res.json();
      if (error) throw new Error(error);

      return data;
    },

    onSuccess: (data) => {
      console.log("data", data);
    },

    onError: (error) => {
      setError(error.message || "Undefined error");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mfaMutation.isPending) return;

    mfaMutation.mutate({ username, code: otp });
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <Box component="label" sx={{ marginBottom: "5px", fontWeight: "bold" }}>
        Enter OTP:
      </Box>

      <TextField
        size="small"
        placeholder="OTP"
        value={otp}
        onChange={(event) => {
          if (event.target.value.length > 6) return;
          setOtp(event.target.value);
        }}
      />

      {error && (
        <Box component="p" sx={{ color: "red", marginTop: "5px" }}>
          {error}
        </Box>
      )}

      <Button type="submit" variant="contained" sx={{ marginTop: "40px" }}>
        Next
      </Button>
    </Box>
  );
};

export default MfaStep;
