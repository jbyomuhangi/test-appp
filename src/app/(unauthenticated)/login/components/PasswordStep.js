"use client";

import { Box, Button, TextField } from "@mui/material";
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
        value={password}
        onChange={(event) => setPassword(event.target.value)}
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

export default PasswordStep;
