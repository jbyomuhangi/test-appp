"use client";

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
  return <>{children}</>;
};

export default Layout;
