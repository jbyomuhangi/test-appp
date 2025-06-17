"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTimeoutFn } from "react-use";

const SuccessStep = () => {
  const router = useRouter();

  useTimeoutFn(() => {
    router.replace("/dashboard");
  }, 1000);

  return (
    <Box>
      <Box
        component="p"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "green",
          textAlign: "center",
        }}
      >
        Login successful!
      </Box>
    </Box>
  );
};

export default SuccessStep;
