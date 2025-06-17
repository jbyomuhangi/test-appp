import NavBar from "@/components/NavBar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />

      {children}
    </>
  );
};

export default Layout;
