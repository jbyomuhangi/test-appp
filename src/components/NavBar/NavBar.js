"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { useMemo } from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  const isMobile = useIsMobile();

  const routes = useMemo(() => {
    return [
      {
        label: "Showcase",
        href: "/showcase",
      },
      {
        label: "Docs",
        href: "/docs",
      },
      {
        label: "Blog",
        href: "/blog",
      },
    ];
  }, []);

  if (isMobile) return <MobileNavBar routes={routes} />;
  return <DesktopNavBar routes={routes} />;
};

export default NavBar;
