"use client";

import { redirect } from "next/navigation";

const Page = () => {
  const token = localStorage.getItem("token");

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/home");
  }

  return null;
};

export default Page;
