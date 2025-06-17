import FlexBox from "@/components/FlexBox";
import LinkBase from "@/components/LinkBase";
import { Button } from "@mui/material";

const styles = {
  mavBarContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
};

const AuthenticateNavBar = () => {
  return (
    <FlexBox BoxProps={{ sx: styles.mavBarContainer }}>
      <LinkBase href="/home">
        <Button
          variant="contained"
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          Log out
        </Button>
      </LinkBase>
    </FlexBox>
  );
};

export default AuthenticateNavBar;
