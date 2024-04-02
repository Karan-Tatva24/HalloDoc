import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { adminProfile } from "../../redux/halloAPIs/adminProfileAPI";
import { accountAccess } from "../../redux/halloAPIs/accountAccessAPI";

const Header = ({ onClickDarkTheme, toggle }) => {
  const [open, setOpen] = useState(false);
  const [providerMenuOpen, setProviderMenuOpen] = useState(false);
  const [recordsMenuOpen, setRecordsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName, id } = useSelector((state) => state?.root.loggedUserData);

  const handleLogout = () => {
    dispatch(logout());
    navigate(AppRoutes.LOGIN);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setProviderMenuOpen(false);
    setRecordsMenuOpen(false);
  };

  const handleNavLinkHover = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    if (menuType === "provider") {
      setProviderMenuOpen(true);
      setRecordsMenuOpen(false);
    } else if (menuType === "records") {
      setProviderMenuOpen(false);
      setRecordsMenuOpen(true);
    }
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
          <Typography>Welcome&nbsp;{userName}</Typography>
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
            to={AppRoutes.PROVIDER_LOCATION}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Provider Location
          </NavLink>
        </li>
        <li>
          <NavLink
            to={AppRoutes.MY_PROFILE}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => dispatch(adminProfile(id))}
          >
            My Profile
          </NavLink>
        </li>
        <li
          onMouseEnter={(e) => handleNavLinkHover(e, "provider")}
          onMouseLeave={handleMenuClose}
        >
          <NavLink
            to={AppRoutes.PROVIDER}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Providers
          </NavLink>
          {providerMenuOpen && (
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
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.SCHEDULING);
                  handleMenuClose();
                }}
              >
                Scheduling
              </MenuItem>
              <MenuItem onClick={() => navigate(-1)}>Invoicing</MenuItem>
            </Menu>
          )}
        </li>
        <li>
          <NavLink
            to={AppRoutes.PARTNERS}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Partners
          </NavLink>
        </li>
        <li>
          <NavLink
            to={AppRoutes.ACCOUNT_ACCESS}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => dispatch(accountAccess())}
          >
            Access
          </NavLink>
        </li>
        <li
          onMouseEnter={(e) => handleNavLinkHover(e, "records")}
          onMouseLeave={handleMenuClose}
        >
          <NavLink
            to={AppRoutes.RECORDS}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Records
          </NavLink>
          {recordsMenuOpen && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.SEARCH_RECORDS);
                  handleMenuClose();
                }}
              >
                Search Records
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.EMAIL_LOGS);
                  handleMenuClose();
                }}
              >
                Email Logs
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.SMS_LOGS)}>
                SMS Logs
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.PATIENT_HISTORY)}>
                Patients Records
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.BLOCKED_HISTORY)}>
                Blocked History
              </MenuItem>
            </Menu>
          )}
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
        <NavLink to={AppRoutes.PROVIDER_LOCATION} className="sidelinks">
          Provider Location
        </NavLink>
        <NavLink
          to={AppRoutes.MY_PROFILE}
          className="sidelinks"
          onClick={() => dispatch(adminProfile())}
        >
          My Profile
        </NavLink>
        <li
          onMouseEnter={(e) => handleNavLinkHover(e, "provider")}
          onMouseLeave={handleMenuClose}
        >
          <NavLink to={AppRoutes.PROVIDER} className="sidelinks">
            Providers
          </NavLink>
          {providerMenuOpen && (
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
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.SCHEDULING);
                  handleMenuClose();
                }}
              >
                Scheduling
              </MenuItem>
              <MenuItem onClick={() => navigate(-1)}>Invoicing</MenuItem>
            </Menu>
          )}
        </li>
        <NavLink to={AppRoutes.PARTNERS} className="sidelinks">
          Partners
        </NavLink>
        <NavLink
          to={AppRoutes.ACCOUNT_ACCESS}
          className="sidelinks"
          onClick={() => dispatch(accountAccess())}
        >
          Access
        </NavLink>
        <li
          onMouseEnter={(e) => handleNavLinkHover(e, "records")}
          onMouseLeave={handleMenuClose}
        >
          <NavLink to={AppRoutes.RECORDS} className="sidelinks">
            Records
          </NavLink>
          {recordsMenuOpen && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.SEARCH_RECORDS);
                  handleMenuClose();
                }}
              >
                Search Records
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.EMAIL_LOGS);
                  handleMenuClose();
                }}
              >
                Email Logs
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.SMS_LOGS)}>
                SMS Logs
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.PATIENT_HISTORY)}>
                Patients Records
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.BLOCKED_HISTORY)}>
                Blocked History
              </MenuItem>
            </Menu>
          )}
        </li>
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
