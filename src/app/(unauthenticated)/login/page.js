"use client";

import FlexBox from "@/components/FlexBox";
import { Card } from "@mui/material";
import { useState } from "react";
import MfaStep from "./components/MfaStep";
import PasswordStep from "./components/PasswordStep";
import SecureWordDisplayStep from "./components/SecureWordDisplayStep";
import SuccessStep from "./components/SuccessStep";
import UserNameStep from "./components/UserNameStep";

const stepsEnum = {
  username: "username",
  secureWordDisplay: "secureWordDisplay",
  password: "password",
  mfa: "mfa",
  success: "success",
};

const Page = () => {
  const [step, setStep] = useState(stepsEnum.username);
  const [username, setUsername] = useState(null);
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
            onNext={({ username, secureWord }) => {
              setUsername(username);
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
          <PasswordStep
            username={username}
            secureWord={secureWord}
            onNext={() => setStep(stepsEnum.mfa)}
          />
        )}

        {step === stepsEnum.mfa && (
          <MfaStep
            username={username}
            onNext={() => setStep(stepsEnum.success)}
          />
        )}

        {step === stepsEnum.success && <SuccessStep />}
      </Card>
    </FlexBox>
  );
};

export default Page;
