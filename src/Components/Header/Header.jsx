import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Menu from "@mui/icons-material/Menu";
import { Button } from "../Button/Button";
import { AppRoutes } from "../../constants/routes";
import { logout } from "../../redux/halloSlices/loginSlice";
import { loginHeading } from "../../assets/Images";
import "./header.css";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate(AppRoutes.LOGIN);
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
    </Box>
  );
};

export default Header;
