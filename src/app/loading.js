import React from "react";

import FlexBox from "@/components/FlexBox";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <FlexBox
      BoxProps={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </FlexBox>
  );
};

export default Loading;
