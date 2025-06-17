import { deleteMfa, getMfa, setMfa } from "@/caches";
import { OTP_EXPIRATION_TIME_IN_SECONDS, SECRET } from "@/settings";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, code } = await request.json();

    /** Check that we have a username and code */
    if (!username || !code) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    /** Check that we have a OTP in the cache */
    const otpData = getMfa(username);
    if (!otpData) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    /** Check that the otp is not expired */
    const now = Date.now();
    const timeLimit = 1000 * OTP_EXPIRATION_TIME_IN_SECONDS;
    if (now - otpData.issuedAt > timeLimit) {
      deleteMfa(username);
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    /** Check that we have not used up all our attempts */
    const attempts = otpData.attempts || 0;
    if (attempts >= 3) {
      deleteMfa(username);
      return NextResponse.json(
        { error: "Attempt limit reached" },
        { status: 400 }
      );
    }

    /** Check that the OTP is correct */
    if (code !== otpData.otp) {
      setMfa(username, {
        ...otpData,
        attempts: attempts + 1,
      });
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    /** Delete the OTP from the cache and return a token */
    deleteMfa(username);
    const token = jwt.sign({ data: username }, SECRET);
    return NextResponse.json({ data: token });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
