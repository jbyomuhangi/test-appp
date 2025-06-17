import mfaCache from "@/mfaCache";
import { OPT_EXPIRATION_TIME_IN_SECONDS, SECRET } from "@/settings";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username } = await request.json();

    /** Check that we have a username */
    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    const timeStamp = Date.now();
    const lastRequest = mfaCache.get(username);
    const timeLimit = 1000 * OPT_EXPIRATION_TIME_IN_SECONDS;

    /** Check that we have not hit our rate limit for requests yet since the last request */
    if (lastRequest && timeStamp - lastRequest.issuedAt < timeLimit) {
      return NextResponse.json(
        { error: "Please try again later" },
        { status: 400 }
      );
    }

    /** Generate a otp code */
    const userNameAndTimeStamp = `${username}${timeStamp}`;
    const otp = CryptoJS.HmacSHA256(userNameAndTimeStamp, SECRET)
      .toString()
      .slice(0, 6);

    /** Store the otp in the request map using the username as the key */
    mfaCache.set(username, {
      username,
      otp,
      issuedAt: timeStamp,
    });

    return NextResponse.json({ data: otp });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
