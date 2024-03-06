import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button } from "../Button";
import { AppRoutes } from "../../constants/routes";
import { logout } from "../../redux/halloSlices/loginSlice";
import { loginHeading } from "../../assets/Images";
import "./header.css";

const Header = ({ onClickDarkTheme, toggle }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate(AppRoutes.LOGIN);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavLinkHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <Box className="header">
        <Box
          className="header-logo-image"
          onClick={() => navigate(AppRoutes.DASHBOARD)}
        >
          <img src={loginHeading} alt="HalloDoc" />
        </Box>
        <Box className="header-user-detail">
          <Typography>Welcome&nbsp;Karan</Typography>
          <Button
            name="Log Out"
            variant="outlined"
            size="medium"
            className="log-out-btn"
            onClick={handleLogout}
          />
          <Button
            variant="outlined"
            size="large"
            className="dark-btn"
            onClick={onClickDarkTheme}
          >
            {!toggle ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="toggle-btn icon-btn"
            onClick={() => setOpen(true)}
          >
            <MenuOutlinedIcon />
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
            to={AppRoutes.MY_PROFILE}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Profile
          </NavLink>
        </li>
        <li onMouseEnter={handleNavLinkHover} onMouseLeave={handleMenuClose}>
          <NavLink
            to={AppRoutes.PROVIDER}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Providers
          </NavLink>
          {anchorEl && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.PROVIDER);
                  handleMenuClose();
                }}
              >
                Provider
              </MenuItem>
              <MenuItem onClick={() => navigate(-1)}>Scheduling</MenuItem>
              <MenuItem onClick={() => navigate(-1)}>Invoicing</MenuItem>
            </Menu>
          )}
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
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          p={1}
        >
          <Button variant="outlined" color="info">
            <DarkModeOutlinedIcon />
          </Button>

          <CloseOutlinedIcon
            onClick={() => setOpen(false)}
            id="close-icon"
            sx={{ position: "initial", cursor: "pointer" }}
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
        <NavLink
          to={AppRoutes.LOGIN}
          className="sidelinks"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Header;
