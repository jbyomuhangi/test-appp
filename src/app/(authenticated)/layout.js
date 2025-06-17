"use client";

import AuthenticateNavBar from "@/components/NavBar/AuthenticateNavBar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      redirect("/home");
    } else {
      setShowComponent(true);
    }
  }, []);

  if (!showComponent) return null;
  return (
    <>
      <AuthenticateNavBar />
      {children}
    </>
  );
};

export default Layout;
