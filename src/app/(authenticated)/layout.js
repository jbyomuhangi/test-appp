"use client";

import { redirect } from "next/navigation";

const Layout = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) redirect("/home");

  return <>{children}</>;
};

export default Layout;
