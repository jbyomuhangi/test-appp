"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      redirect("/dashboard");
    } else {
      redirect("/home");
    }
  }, []);

  return null;
};

export default Page;
