import { NextResponse } from "next/server";

export const GET = async () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      age: 25,
    },
    {
      id: 2,
      name: "Bob builder",
      age: 30,
    },
    {
      id: 3,
      name: "Jane Doe",
      age: 50,
    },
    {
      id: 4,
      name: "Mickey Mouse",
      age: 11,
    },
  ];

  return NextResponse.json({ data });
};
