import { Box } from "@mui/material";
import React from "react";

import { emptyObject } from "@/utils/noOpUtils";

const FlexBox = ({ children, BoxProps = emptyObject }) => {
  const { sx, ...otherBoxProps } = BoxProps;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      {...otherBoxProps}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
