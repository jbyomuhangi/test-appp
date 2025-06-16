import { NextResponse } from "next/server";
// import {generateMfaCode} from "@/app/lib/utils";

export async function POST(request) {
  try {
    const { username, code } = await request.json();

    if (!username || !code) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    // const attempts = mfaAttempts.get(username) || 0;
    // if (attempts >= 3) {
    //     return NextResponse.json({ error: 'Too many attempts. Account locked.' }, { status: 403 });
    // }

    // const expectedCode = generateMfaCode(username);
    // if (code !== expectedCode) {
    //     mfaAttempts.set(username, attempts + 1);
    //     return NextResponse.json({ error: 'Invalid MFA code' }, { status: 401 });
    // }

    // mfaAttempts.delete(username);
    // const token = 'mock-session-token';
    return NextResponse.json({ data: "mock-session-token" });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
