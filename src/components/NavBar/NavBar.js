"use client";

import FlexBox from "@/components/FlexBox";
import LinkBase from "@/components/LinkBase";
import { TextField } from "@mui/material";
import { flexDirection } from "@mui/system";
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

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
    marginLeft: "auto",
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

      <FlexBox BoxProps={{ sx: styles.rightContainer }}>
        <TextField
          size="small"
          placeholder="Search..."
          sx={{ width: "200px", marginLeft: "auto" }}
        />

        <LinkBase href="/login">Login</LinkBase>
      </FlexBox>
    </FlexBox>
  );
};

export default NavBar;
