import LinkBase from "@/components/LinkBase";
import { Box } from "@mui/material";
import React from "react";

const TitleButton = () => {
  return (
    <LinkBase href="/">
      <Box
        component="p"
        sx={{ fontSize: "20px", fontWeight: "bold", color: "primary.main" }}
      >
        Text App
      </Box>
    </LinkBase>
  );
};

export default TitleButton;
