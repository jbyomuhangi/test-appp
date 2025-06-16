"use client";

import FlexBox from "@/components/FlexBox";
import { Button, Card } from "@mui/material";
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
  const [secureWord, setSecureWord] = useState(null);

  return (
    <FlexBox
      BoxProps={{
        sx: { flex: 1, alignItems: "center", justifyContent: "center" },
      }}
    >
      <Card sx={{ padding: "20px", width: "300px" }} elevation={10}>
        {step === stepsEnum.username && (
          <UserNameStep
            onNext={(secureWord) => {
              setSecureWord(secureWord);
              setStep(stepsEnum.secureWordDisplay);
            }}
          />
        )}

        {step === stepsEnum.secureWordDisplay && (
          <SecureWordDisplayStep
            secureWord={secureWord}
            onNext={() => setStep(stepsEnum.password)}
          />
        )}

        {step === stepsEnum.password && (
          <PasswordStep onNext={() => setStep(stepsEnum.success)} />
        )}
      </Card>
    </FlexBox>
  );
};

export default Page;
