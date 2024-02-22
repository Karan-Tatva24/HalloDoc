import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import React from "react";
import { loginHeading } from "../../assets/Images";
import { Button } from "../Button/Button";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Menu from "@mui/icons-material/Menu";
import { useAuth } from "../../Utils/auth";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate(AppRoutes.LOGIN);
  };

  return (
    <Box>
      <Box className="header">
        <NavLink to={AppRoutes.DASHBOARD}>
          <Box className="header-logo-image">
            <img src={loginHeading} alt="HalloDoc" />
          </Box>
        </NavLink>
        <Box className="header-user-detail">
          <Typography>Welcome&nbsp;{auth.user}</Typography>
          <Button
            name="Log Out"
            variant="outlined"
            size="medium"
            className="log-out-btn"
            onClick={handleLogout}
          />
          <Button variant="outlined" size="large" className="dark-btn icon-btn">
            <IconButton size="small">
              <DarkModeOutlinedIcon />
            </IconButton>
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="toggle-btn icon-btn"
            onClick={() => setOpen(true)}
          >
            <IconButton variant="outlined" color="neutral">
              <Menu />
            </IconButton>
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box className="header-nav-links">
        <li>
          <NavLink
            to={AppRoutes.DASHBOARD}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Provider Location
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Providers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Partners
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Access
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Records
          </NavLink>
        </li>
      </Box>

      <Drawer open={open} onClose={() => setOpen(false)} className="sidebar">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <Button variant="outlined" size="large" className="dark-btn icon-btn">
            <IconButton size="small">
              <DarkModeOutlinedIcon />
            </IconButton>
          </Button>

          <CloseOutlinedIcon
            onClick={() => setOpen(false)}
            id="close-icon"
            sx={{ position: "initial" }}
          />
        </Box>
        <NavLink to={AppRoutes.DASHBOARD} className="sidelinks">
          Dashboard
        </NavLink>
        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Provider Location
        </NavLink>
        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          My Profile
        </NavLink>
        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Providers
        </NavLink>
        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Partners
        </NavLink>
        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Access
        </NavLink>
        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Records
        </NavLink>
        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Logout
        </NavLink>
      </Drawer>
    </Box>
  );
};

export default Header;
