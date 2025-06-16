"use client";

import useIsMobile from "@/hooks/useIsMobile";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileNavBar />;
  return <DesktopNavBar />;
};

export default NavBar;
