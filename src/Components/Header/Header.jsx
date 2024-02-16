import { Box, Divider, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import React from "react";
import { loginHeading } from "../../assets/Images";
import { Button } from "../Button/Button";
import "./header.css";

const Header = () => {
  return (
    <Box>
      <Box className="header">
        <Box className="header-logo-image">
          <img src={loginHeading} alt="HalloDoc" />
        </Box>
        <Box className="header-user-detail">
          <Typography>Welcome, Karan</Typography>
          <Button
            name="Log Out"
            variant="outlined"
            size="medium"
            className="MuiButton-textSizeSmall"
          />
          <Button
            name={<DarkModeOutlinedIcon fontSize="small" />}
            variant="outlined"
            size="large"
          />
        </Box>
      </Box>
      <Divider />
      <Box className="header-nav-links">
        <li>Dashboard</li>
        <li>Provider Location</li>
        <li>My Profile</li>
        <li>Providers</li>
        <li>Partners</li>
        <li>Access</li>
        <li>Records</li>
      </Box>
    </Box>
  );
};

export default Header;
