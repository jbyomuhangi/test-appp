"use client";

import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const MfaStep = ({ username, onNext }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/verifyMfa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, code: otp }),
      });

      const { data, error } = await res.json();

      if (data) {
        console.log("?????", data);
      } else {
        setError(error);
      }
    } catch (error) {
      setError(error.message || "Undefined error");
    }
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
