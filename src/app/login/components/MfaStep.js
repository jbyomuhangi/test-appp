"use client";

import { OPT_EXPIRATION_TIME_IN_SECONDS } from "@/settings";
import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInterval, useMount } from "react-use";

const MfaStep = ({ username, onNext }) => {
  const [otp, setOtp] = useState();

  const [otpInput, setOtpInput] = useState("");
  const [error, setError] = useState(null);

  const createOptMutation = useMutation({
    mutationFn: async ({ username }) => {
      console.log("running mutation.....");
      const res = await fetch("/api/createOpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const { data, error } = await res.json();
      if (error) throw new Error(error);
      return data;
    },

    onSuccess: (data) => {
      setOtp(data);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const verifyMfaMutation = useMutation({
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

  /** Create an OTP on mount */
  useMount(() => {
    createOptMutation.mutate({ username });
  });

  /** Create a new OTP every OPT_EXPIRATION_TIME_IN_SECONDS */
  useInterval(() => {
    createOptMutation.mutate({ username });
  }, 1000 * OPT_EXPIRATION_TIME_IN_SECONDS);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (verifyMfaMutation.isPending) return;

    verifyMfaMutation.mutate({ username, code: otpInput });
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <Box component="label" sx={{ marginBottom: "5px", fontWeight: "bold" }}>
        Enter OTP: {otp}
      </Box>

      <TextField
        size="small"
        placeholder="OTP"
        value={otpInput}
        onChange={(event) => {
          if (event.target.value.length > 6) return;
          setOtpInput(event.target.value);
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
