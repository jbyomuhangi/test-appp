"use client";

import LinkBase from "@/components/LinkBase";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import NavButton from "./NavButton";

const PageLinks = () => {
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
    <>
      {routes.map((route) => {
        const isSelected = pathname.startsWith(route.href);

        return (
          <LinkBase key={route.href} href={route.href}>
            <NavButton isSelected={isSelected}>{route.label}</NavButton>
          </LinkBase>
        );
      })}
    </>
  );
};

export default PageLinks;
