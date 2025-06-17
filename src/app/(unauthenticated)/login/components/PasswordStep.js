"use client";

import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CryptoJS from "crypto-js";
import { useState } from "react";

const PasswordStep = ({
  secureWordTimeout,
  username,
  secureWord,
  onNext,
  onRetry,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const passwordMutation = useMutation({
    mutationFn: async (hashedPassword) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          hashedPassword,
          secureWord,
        }),
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

      onNext();
    },

    onError: (error) => {
      setError(error.message || "Undefined error");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordMutation.isPending) return;

    const hashedPassword = CryptoJS.SHA256(password).toString();
    passwordMutation.mutate(hashedPassword);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <Box component="label" sx={{ marginBottom: "5px", fontWeight: "bold" }}>
        Enter password
        {secureWordTimeout && (
          <Box component="span" sx={{ color: "red", fontSize: "12px" }}>
            &nbsp; (time remaining {secureWordTimeout}s)
          </Box>
        )}
        :
      </Box>

      <TextField
        autoFocus
        size="small"
        placeholder="Password"
        type="password"
        disabled={passwordMutation.isPending || !secureWordTimeout}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && (
        <Box component="p" sx={{ color: "red", marginTop: "5px" }}>
          {error}
        </Box>
      )}

      <Box
        sx={{ marginTop: "40px", display: "flex", justifyContent: "center" }}
      >
        {passwordMutation.isPending && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {!passwordMutation.isPending && secureWordTimeout > 0 && (
          <Button type="submit" variant="contained">
            Next
          </Button>
        )}

        {secureWordTimeout < 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box component="p" sx={{ color: "red", fontWeight: "bold" }}>
              Secure word has expired. Please try again.
            </Box>

            <Button variant="contained" onClick={onRetry}>
              Try again
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PasswordStep;
