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
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button } from "../Button";
import { AppRoutes } from "../../constants/routes";
import { logout } from "../../redux/halloSlices/adminSlices/loginSlice";
import { loginHeading } from "../../assets/Images";
import { toast } from "react-toastify";
import "./header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
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
        <Box
          className="header-logo-image"
          onClick={() => navigate(AppRoutes.DASHBOARD)}
        >
          <img src={loginHeading} alt="HalloDoc" />
        </Box>
        {isLoggedIn ? (
          <>
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
                className="toggle-btn icon-btn"
                onClick={() => setOpen(true)}
              >
                <MenuOutlinedIcon />
              </Button>
            </Box>
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

      <Drawer open={open} onClose={() => setOpen(false)} className="sidebar">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          p={1}
        >
          <CloseOutlinedIcon
            onClick={() => setOpen(false)}
            id="close-icon"
            sx={{ position: "initial", cursor: "pointer" }}
          />
          <LogoutOutlinedIcon
            onClick={handleLogout}
            id="close-icon"
            sx={{ position: "initial", cursor: "pointer" }}
          />
        </Box>

        <NavLink to={AppRoutes.DASHBOARD} className="sideLinks">
          Dashboard
        </NavLink>
        {accountType === "Admin" ? (
          <NavLink to={AppRoutes.PROVIDER_LOCATION} className="sideLinks">
            Provider Location
          </NavLink>
        ) : (
          <NavLink to={AppRoutes.INVOICING} className="sideLinks">
            Invoicing
          </NavLink>
        )}
        {accountType === "Physician" ? (
          <NavLink to={AppRoutes.MY_SCHEDULE} className="sideLinks">
            My Schedule
          </NavLink>
        ) : null}
        <NavLink to={AppRoutes.MY_PROFILE} className="sideLinks">
          My Profile
        </NavLink>
        {accountType === "Admin" ? (
          <>
            <li
              onMouseEnter={(e) => handleNavLinkHover(e, "provider")}
              onMouseLeave={handleMenuClose}
            >
              <NavLink to={AppRoutes.PROVIDER} className="sideLinks">
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
                      navigate(-1);
                      handleMenuClose();
                    }}
                  >
                    Invoicing
                  </MenuItem>
                </Menu>
              )}
            </li>
            <NavLink to={AppRoutes.PARTNERS} className="sideLinks">
              Partners
            </NavLink>
            <li
              onMouseEnter={(e) => handleNavLinkHover(e, "access")}
              onMouseLeave={handleMenuClose}
            >
              <NavLink to={AppRoutes.ACCOUNT_ACCESS} className="sideLinks">
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
              <NavLink to={AppRoutes.RECORDS} className="sideLinks">
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
          </>
        ) : null}
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Header;
