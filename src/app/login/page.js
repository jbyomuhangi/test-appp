"use client";

import FlexBox from "@/components/FlexBox";
import { Button } from "@mui/material";
import React, { useState } from "react";
import PasswordStep from "./components/PasswordStep";
import SecureWordDisplayStep from "./components/SecureWordDisplayStep";
import UserNameStep from "./components/UserNameStep";

const stepsEnum = {
  username: "username",
  secureWordDisplay: "secureWordDisplay",
  password: "password",
};

const Page = () => {
  const [step, setStep] = useState(stepsEnum.username);

  return (
    <FlexBox
      BoxProps={{
        sx: { flex: 1, alignItems: "center", justifyContent: "center" },
      }}
    >
      {step === stepsEnum.username && <UserNameStep />}
      {step === stepsEnum.password && <PasswordStep />}
      {step === stepsEnum.secureWordDisplay && <SecureWordDisplayStep />}
    </FlexBox>
  );
};

export default Page;
