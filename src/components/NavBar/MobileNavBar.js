"use client";

import FlexBox from "@/components/FlexBox";
import useDebounce from "@/hooks/useDebounce";
import useResizeObserver from "@/hooks/useResizeObserver";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, ButtonBase, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import LinkBase from "../LinkBase";
import TitleButton from "./TitleButton";

const styles = {
  mavBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },
};

const MobileNavBar = ({ routes }) => {
  const theme = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(0);

  const debouncedSetAppBarHeight = useDebounce({
    func: (element) => {
      setAppBarHeight(element.clientHeight);
    },
    delay: 100,
  });

  const ref = useResizeObserver({ callback: debouncedSetAppBarHeight });

  return (
    <>
      <FlexBox
        BoxProps={{
          ref,
          sx: {
            position: "relative",
            zIndex: theme.zIndex.drawer + 1,
            ...styles.mavBarContainer,
          },
        }}
      >
        <TitleButton />

        <FlexBox
          BoxProps={{
            sx: { flexDirection: "row", gap: "10px", alignItems: "center" },
          }}
        >
          <ButtonBase>
            <SearchIcon />
          </ButtonBase>

          <ButtonBase onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </ButtonBase>
        </FlexBox>
      </FlexBox>

      <Drawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        slotProps={{ paper: { sx: { width: "100%" } } }}
      >
        <FlexBox
          BoxProps={{
            sx: {
              padding: `${appBarHeight + 10}px 10px 10px 10px`,
              gap: "10px",
            },
          }}
        >
          {routes.map((route) => {
            return (
              <LinkBase
                key={route.href}
                href={route.href}
                LinkProps={{ onClick: () => setIsMenuOpen(false) }}
              >
                {route.label}
              </LinkBase>
            );
          })}

          <Box sx={{ marginTop: "20px" }}>
            <LinkBase
              href="/login"
              LinkProps={{ onClick: () => setIsMenuOpen(false) }}
            >
              <Button variant="contained" sx={{ width: "100%" }}>
                Login
              </Button>
            </LinkBase>
          </Box>
        </FlexBox>
      </Drawer>
    </>
  );
};

export default MobileNavBar;
