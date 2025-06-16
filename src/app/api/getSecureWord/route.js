import { SECRET } from "@/settings";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

const requestMap = new Map();

export const POST = async (request) => {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const timeStamp = Date.now();
    const lastRequest = requestMap.get(username);
    const timeLimit = 1000 * 10; // 10 seconds

    if (lastRequest && timeStamp - lastRequest.issuedAt < timeLimit) {
      return NextResponse.json(
        { error: "Please try again later" },
        { status: 400 }
      );
    }

    const userNameAndTimeStamp = `${username}${timeStamp}`;
    const secureWord = CryptoJS.HmacSHA256(
      userNameAndTimeStamp,
      SECRET
    ).toString();

    requestMap.set(username, { username, secureWord, issuedAt: timeStamp });

    return NextResponse.json({ data: secureWord });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
