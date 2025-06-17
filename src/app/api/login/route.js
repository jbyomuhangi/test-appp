import { secureWordCache } from "@/caches";
import { SECRET, SECURE_WORD_EXPIRATION_TIME_IN_SECONDS } from "@/settings";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { username, hashedPassword, secureWord } = await request.json();

    /** Check that we have a username, hashedPassword and secure word */
    if (!username || !hashedPassword || !secureWord) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    /** Check that we have a secure word in the request map */
    const lastRequest = secureWordCache.get(username);
    if (!lastRequest) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    /** Check that the secure word is the same as the one in the request map */
    if (lastRequest.secureWord !== secureWord) {
      return NextResponse.json(
        { error: "Invalid secure word" },
        { status: 400 }
      );
    }

    /** Check that the secure word is not expired */
    const now = Date.now();
    const timeLimit = 1000 * SECURE_WORD_EXPIRATION_TIME_IN_SECONDS;
    if (now - lastRequest.issuedAt > timeLimit) {
      secureWordCache.delete(username);
      return NextResponse.json(
        { error: "The secure word is expired" },
        { status: 400 }
      );
    }

    /** Generate a token */
    const token = jwt.sign({ data: username }, SECRET);
    return NextResponse.json({ data: token });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
