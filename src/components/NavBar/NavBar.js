"use client";

import FlexBox from "@/components/FlexBox";
import LinkBase from "@/components/LinkBase";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import NavButton from "./NavButton";

const styles = {
  mavBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },

  routesContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: "10px",
  },
};

const NavBar = () => {
  const pathname = usePathname();

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

  return (
    <FlexBox BoxProps={{ sx: styles.mavBarContainer }}>
      <LinkBase href="/">Text App</LinkBase>

      <FlexBox BoxProps={{ sx: styles.routesContainer }}>
        {routes.map((route) => {
          const isSelected = pathname.startsWith(route.href);

          return (
            <LinkBase key={route.href} href={route.href}>
              <NavButton isSelected={isSelected}>{route.label}</NavButton>
            </LinkBase>
          );
        })}
      </FlexBox>

      <LinkBase href="/login" LinkProps={{ style: { marginLeft: "auto" } }}>
        Login
      </LinkBase>
    </FlexBox>
  );
};

export default NavBar;
