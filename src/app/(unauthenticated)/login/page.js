"use client";

import FlexBox from "@/components/FlexBox";
import { SECURE_WORD_EXPIRATION_TIME_IN_SECONDS } from "@/settings";
import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useInterval } from "react-use";
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
  const [secureWordTimeout, setSecureWordTimeout] = useState(null);

  /** Count down to let user know when the secure word will expire */
  useInterval(
    () => {
      setSecureWordTimeout((prev) => prev - 1);
    },
    secureWordTimeout !== null ? 1000 : null
  );

  useEffect(() => {
    const shouldStopCountdown =
      secureWordTimeout === 0 ||
      ![stepsEnum.secureWordDisplay, stepsEnum.password].includes(step);

    if (shouldStopCountdown) setSecureWordTimeout(null);
  }, [secureWordTimeout, step]);

  /** Attempt to "warm" our api routes */
  useEffect(() => {
    fetch("/api/verifyMfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", code: "123456" }),
    }).catch(() => {});
  }, []);

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
              setSecureWordTimeout(SECURE_WORD_EXPIRATION_TIME_IN_SECONDS);
            }}
          />
        )}

        {step === stepsEnum.secureWordDisplay && (
          <SecureWordDisplayStep
            secureWord={secureWord}
            secureWordTimeout={secureWordTimeout}
            onNext={() => setStep(stepsEnum.password)}
          />
        )}

        {step === stepsEnum.password && (
          <PasswordStep
            secureWordTimeout={secureWordTimeout}
            username={username}
            secureWord={secureWord}
            onNext={() => setStep(stepsEnum.mfa)}
            onRetry={() => {
              setStep(stepsEnum.username);
            }}
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
