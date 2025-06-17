"use client";

import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const UserNameStep = ({ onNext }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const userNameMutation = useMutation({
    mutationFn: async (username) => {
      const res = await fetch("/api/getSecureWord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const { data, error } = await res.json();
      if (error) throw new Error(error);

      return data;
    },

    onSuccess: (secureWord) => {
      onNext({ username, secureWord });
    },

    onError: (error) => {
      setError(error.message || "Undefined error");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userNameMutation.isPending) return;
    userNameMutation.mutate(username);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <Box component="label" sx={{ marginBottom: "5px", fontWeight: "bold" }}>
        Enter username:
      </Box>

      <TextField
        size="small"
        placeholder="Username"
        disabled={userNameMutation.isPending}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      {error && (
        <Box component="p" sx={{ color: "red", marginTop: "5px" }}>
          {error}
        </Box>
      )}

      <Box
        sx={{ marginTop: "40px", display: "flex", justifyContent: "center" }}
      >
        {userNameMutation.isPending && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {!userNameMutation.isPending && (
          <Button type="submit" variant="contained">
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserNameStep;
