import FlexBox from "@/components/FlexBox";
import LinkBase from "@/components/LinkBase";
import { Button, TextField } from "@mui/material";
import { usePathname } from "next/navigation";
import NavButton from "./NavButton";
import TitleButton from "./TitleButton";

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

const DesktopNavBar = ({ routes }) => {
  const pathname = usePathname();

  return (
    <FlexBox BoxProps={{ sx: styles.mavBarContainer }}>
      <TitleButton />

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

        <LinkBase href="/login">
          <Button variant="contained">Login</Button>
        </LinkBase>
      </FlexBox>
    </FlexBox>
  );
};

export default DesktopNavBar;
