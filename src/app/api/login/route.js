import requestMap from "@/app/api/requestsMap";
import { SECRET } from "@/settings";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { username, hashedPassword, secureWord } = await request.json();
    if (!username || !hashedPassword || !secureWord) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const lastRequest = requestMap.get(username);

    if (!lastRequest) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    if (lastRequest.secureWord !== secureWord) {
      return NextResponse.json(
        { error: "Invalid secure word" },
        { status: 400 }
      );
    }

    const now = Date.now();
    const timeLimit = 1000 * 60; // 60 seconds

    if (now - lastRequest.issuedAt > timeLimit) {
      return NextResponse.json(
        { error: "The secure word is expired" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ data: username }, SECRET);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
