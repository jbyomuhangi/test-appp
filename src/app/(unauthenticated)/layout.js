"use client";

import UnauthenticatedNavBar from "@/components/NavBar/UnauthenticatedNavBar";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      redirect("/dashboard");
    } else {
      setShowComponent(true);
    }
  }, []);

  if (!showComponent) return null;

  return (
    <>
      <UnauthenticatedNavBar />
      {children}
    </>
  );
};

export default Layout;
