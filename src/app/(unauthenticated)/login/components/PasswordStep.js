"use client";

import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CryptoJS from "crypto-js";
import { useState } from "react";

const PasswordStep = ({ username, secureWord, onNext }) => {
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
      if (error) throw new Error(error);

      return data;
    },

    onSuccess: () => {
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
        Enter password:
      </Box>

      <TextField
        size="small"
        placeholder="Password"
        type="password"
        disabled={passwordMutation.isPending}
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

        {!passwordMutation.isPending && (
          <Button type="submit" variant="contained">
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PasswordStep;
