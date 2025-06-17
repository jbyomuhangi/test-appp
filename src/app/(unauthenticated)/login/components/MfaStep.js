"use client";

import { OTP_EXPIRATION_TIME_IN_SECONDS } from "@/settings";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useInterval, useMount } from "react-use";

const MfaStep = ({ username, onNext, onRetry }) => {
  const [otp, setOtp] = useState();

  const [otpInput, setOtpInput] = useState("");
  const [error, setError] = useState(null);

  const createOtpMutation = useMutation({
    mutationFn: async ({ username }) => {
      const res = await fetch("/api/createOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const { data, error } = await res.json();
      if (error) return;
      return data;
    },

    onSuccess: (data) => {
      if (!data) return;
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
      if (error) {
        setError(error);
        return;
      }

      return data;
    },

    onSuccess: (data) => {
      if (!data) return;

      localStorage.setItem("token", data);
      onNext();
    },

    onError: (error) => {
      setError(error.message || "Undefined error");
    },
  });

  const isAttemptLimitReached = error === "Attempt limit reached";

  /** Create an OTP on mount */
  useMount(() => {
    createOtpMutation.mutate({ username });
  });

  /** Create a new OTP every OTP_EXPIRATION_TIME_IN_SECONDS */
  useInterval(
    () => {
      createOtpMutation.mutate({ username });
    },
    isAttemptLimitReached ? null : 1000 * OTP_EXPIRATION_TIME_IN_SECONDS
  );

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
        autoFocus
        size="small"
        placeholder="OTP"
        value={otpInput}
        disabled={verifyMfaMutation.isPending}
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

      <Box
        sx={{ marginTop: "40px", display: "flex", justifyContent: "center" }}
      >
        {verifyMfaMutation.isPending && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {!verifyMfaMutation.isPending && !isAttemptLimitReached && (
          <Button type="submit" variant="contained">
            Next
          </Button>
        )}

        {isAttemptLimitReached && (
          <Button variant="contained" onClick={onRetry}>
            Try again
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MfaStep;
