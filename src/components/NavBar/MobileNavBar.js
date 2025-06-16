"use client";

import FlexBox from "@/components/FlexBox";
import MenuIcon from "@mui/icons-material/Menu";
import { ButtonBase } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import PageLinks from "./PageLinks";
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
  },
};

const MobileNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <FlexBox BoxProps={{ sx: styles.mavBarContainer }}>
      <TitleButton />

      <ButtonBase onClick={() => setIsMenuOpen(true)}>
        <MenuIcon />
      </ButtonBase>

      <Drawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <FlexBox>
          <PageLinks />
        </FlexBox>
      </Drawer>
    </FlexBox>
  );
};

export default MobileNavBar;
