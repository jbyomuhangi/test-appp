import { ButtonBase } from "@mui/material";
import React from "react";

const styles = {
  navButtonContainer: {
    padding: "5px 10px",
    border: "1px solid black",
    borderRadius: "5px",
  },

  selectedNavButtonContainer: {
    backgroundColor: "black",
    color: "white",
  },
};

const NavButton = ({ children, isSelected }) => {
  return (
    <ButtonBase
      sx={{
        ...styles.navButtonContainer,
        ...(isSelected && styles.selectedNavButtonContainer),
      }}
    >
      {children}
    </ButtonBase>
  );
};

export default NavButton;
