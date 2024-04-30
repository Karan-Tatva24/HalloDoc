import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button } from "../Button";
import { AppRoutes } from "../../constants/routes";
import { logout } from "../../redux/halloSlices/adminSlices/loginSlice";
import { loginHeading } from "../../assets/Images";
import { toast } from "react-toastify";
import "./header.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [providerListOpen, setProviderListOpen] = useState(false);
  const [recordListOpen, setRecordListOpen] = useState(false);
  const [accessListOpen, setAccessListOpen] = useState(false);
  const [providerMenuOpen, setProviderMenuOpen] = useState(false);
  const [recordsMenuOpen, setRecordsMenuOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName, accountType } = useSelector(
    (state) => state?.root.loggedUserData,
  );
  const { isLoggedIn } = useSelector((state) => state.root.login);

  const handleLogout = () => {
    dispatch(logout());
    navigate(AppRoutes.LOGIN);
    toast.success("You are successfully logout");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setProviderMenuOpen(false);
    setRecordsMenuOpen(false);
    setAccessMenuOpen(false);
  };

  const handleNavLinkHover = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    if (menuType === "provider") {
      setProviderMenuOpen(true);
      setRecordsMenuOpen(false);
      setAccessMenuOpen(false);
    } else if (menuType === "records") {
      setProviderMenuOpen(false);
      setRecordsMenuOpen(true);
      setAccessMenuOpen(false);
    } else if (menuType === "access") {
      setProviderMenuOpen(false);
      setRecordsMenuOpen(false);
      setAccessMenuOpen(true);
    }
  };

  return (
    <Box>
      <Box className="header">
        <Box display="flex" alignItems="center" gap={3}>
          <Button
            variant="outlined"
            size="large"
            className="toggle-btn icon-btn"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuOutlinedIcon fontSize="large" />
          </Button>
          <img
            className="header-logo-image"
            src={loginHeading}
            alt="HalloDoc"
            onClick={() => navigate(AppRoutes.DASHBOARD)}
          />
        </Box>
        {isLoggedIn ? (
          <>
            <Box className="header-user-detail">
              <Typography className="user-name">
                Welcome&nbsp;{userName}
              </Typography>
              <Button
                name="Log Out"
                variant="outlined"
                size="medium"
                className="log-out-btn"
                onClick={handleLogout}
              />
            </Box>
            <Button
              variant="outlined"
              size="large"
              className="toggle-btn icon-btn"
              onClick={handleLogout}
            >
              <LogoutOutlinedIcon fontSize="large" />
            </Button>
          </>
        ) : null}
      </Box>
      <Divider />
      {isLoggedIn ? (
        <>
          <Box className="header-nav-links">
            <li>
              <NavLink
                to={AppRoutes.DASHBOARD}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </NavLink>
            </li>
            {accountType === "Admin" ? (
              <li>
                <NavLink
                  to={AppRoutes.PROVIDER_LOCATION}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Provider Location
                </NavLink>
              </li>
            ) : accountType === "Physician" ? (
              <li>
                <NavLink
                  to={AppRoutes.INVOICING}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Invoicing
                </NavLink>
              </li>
            ) : null}
            {accountType === "Physician" ? (
              <li>
                <NavLink
                  to={AppRoutes.MY_SCHEDULE}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  My Schedule
                </NavLink>
              </li>
            ) : null}
            <li>
              <NavLink
                to={
                  accountType === "User"
                    ? AppRoutes.USER_PROFILE
                    : AppRoutes.MY_PROFILE
                }
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {accountType === "User" ? "Profile" : "My Profile"}
              </NavLink>
            </li>
            {accountType === "Admin" ? (
              <>
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
                      <MenuItem
                        onClick={() => {
                          navigate(AppRoutes.INVOICING);
                          handleMenuClose();
                        }}
                      >
                        Invoicing
                      </MenuItem>
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
                <li
                  onMouseEnter={(e) => handleNavLinkHover(e, "access")}
                  onMouseLeave={handleMenuClose}
                >
                  <NavLink
                    to={AppRoutes.ACCOUNT_ACCESS}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Access
                  </NavLink>
                  {accessMenuOpen && (
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate(AppRoutes.ACCOUNT_ACCESS);
                          handleMenuClose();
                        }}
                      >
                        Account Access
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate(AppRoutes.USER_ACCESS);
                          handleMenuClose();
                        }}
                      >
                        User Access
                      </MenuItem>
                    </Menu>
                  )}
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
                      <MenuItem
                        onClick={() => {
                          navigate(AppRoutes.SMS_LOGS);
                          handleMenuClose();
                        }}
                      >
                        SMS Logs
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate(AppRoutes.PATIENT_HISTORY);
                          handleMenuClose();
                        }}
                      >
                        Patients Records
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate(AppRoutes.BLOCKED_HISTORY);
                          handleMenuClose();
                        }}
                      >
                        Blocked History
                      </MenuItem>
                    </Menu>
                  )}
                </li>
              </>
            ) : null}
          </Box>
        </>
      ) : null}

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="sidebar"
      >
        <List
          component="nav"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ fontSize: "large" }}
            >
              Welcome, <b>{userName}</b>
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate(AppRoutes.DASHBOARD);
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          {accountType === "Admin" ? (
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate(AppRoutes.PROVIDER_LOCATION);
              }}
            >
              <ListItemText primary="Provider Location" />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate(AppRoutes.INVOICING);
              }}
            >
              <ListItemText primary="Invoicing" />
            </ListItemButton>
          )}
          {accountType === "Physician" ? (
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate(AppRoutes.MY_SCHEDULE);
              }}
            >
              <ListItemText primary="My Schedule" />
            </ListItemButton>
          ) : null}
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate(AppRoutes.MY_PROFILE);
            }}
          >
            <ListItemText primary="My Profile" />
          </ListItemButton>
          {accountType === "Admin" ? (
            <>
              <ListItemButton
                onClick={() => setProviderListOpen(!providerListOpen)}
              >
                <ListItemText primary="Provider" />
                {providerListOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={providerListOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.PROVIDER);
                    }}
                  >
                    <ListItemText primary="Provider" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.SCHEDULING);
                    }}
                  >
                    <ListItemText primary="Scheduling" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  navigate(AppRoutes.PARTNERS);
                }}
              >
                <ListItemText primary="Partners" />
              </ListItemButton>
              <ListItemButton
                onClick={() => setAccessListOpen(!accessListOpen)}
              >
                <ListItemText primary="Access" />
                {accessListOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={accessListOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.ACCOUNT_ACCESS);
                    }}
                  >
                    <ListItemText primary="Account Access" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.USER_ACCESS);
                    }}
                  >
                    <ListItemText primary="User Access" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => setRecordListOpen(!recordListOpen)}
              >
                <ListItemText primary="Records" />
                {recordListOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={recordListOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.SEARCH_RECORDS);
                    }}
                  >
                    <ListItemText primary="Search Records" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.EMAIL_LOGS);
                    }}
                  >
                    <ListItemText primary="Email Logs" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.SMS_LOGS);
                    }}
                  >
                    <ListItemText primary="SMS Logs" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.PATIENT_HISTORY);
                    }}
                  >
                    <ListItemText primary="Patient Records" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(AppRoutes.BLOCKED_HISTORY);
                    }}
                  >
                    <ListItemText primary="Block History" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ) : null}
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Header;
