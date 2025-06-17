"use client";

import NavBar from "@/components/NavBar";
import { redirect } from "next/navigation";
import React from "react";

const Layout = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) redirect("/dashboard");

  return (
    <>
      <NavBar />

      {children}
    </>
  );
};

export default Layout;
