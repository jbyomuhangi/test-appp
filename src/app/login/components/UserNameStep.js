"use client";

import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const UserNameStep = ({ onNext }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("aaaaa");

    try {
      const res = await fetch("/api/getSecureWord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const { data, error } = await res.json();

      if (data) {
        onNext(data);
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
      <Box component="label" sx={{ marginBottom: "5px" }}>
        Enter username:
      </Box>

      <TextField
        size="small"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
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

export default UserNameStep;
