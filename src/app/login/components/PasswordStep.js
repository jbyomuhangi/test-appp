"use client";

import FlexBox from "@/components/FlexBox";
import { Box, Button, TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import React, { useState } from "react";

const PasswordStep = ({ username, secureWord, onNext }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          hashedPassword: hashedPassword,
          secureWord,
        }),
      });

      const { data, error } = await res.json();

      if (data) {
        console.log("data", data);
        // onNext();
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
