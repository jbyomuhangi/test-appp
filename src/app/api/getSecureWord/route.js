import { secureWordCache } from "@/caches";
import { SECRET, SECURE_WORD_REQUEST_RATE_LIMIT_IN_SECONDS } from "@/settings";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { username } = await request.json();

    /** Check that we have a username */
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const timeStamp = Date.now();
    const lastRequest = secureWordCache.get(username);
    const timeLimit = 1000 * SECURE_WORD_REQUEST_RATE_LIMIT_IN_SECONDS;

    /** Check that we have not hit our rate limit for requests yet since the last request */
    if (lastRequest && timeStamp - lastRequest.issuedAt < timeLimit) {
      return NextResponse.json(
        { error: "Please try again later" },
        { status: 400 }
      );
    }

    /** Generate a secure word */
    const userNameAndTimeStamp = `${username}${timeStamp}`;
    const secureWord = CryptoJS.HmacSHA256(
      userNameAndTimeStamp,
      SECRET
    ).toString();

    /** Store the secure word in the request map using the username as the key */
    secureWordCache.set(username, {
      username,
      secureWord,
      issuedAt: timeStamp,
    });

    return NextResponse.json({ data: secureWord });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
