import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import React from "react";
import { loginHeading } from "../../assets/Images";
import { Button } from "../Button/Button";
import "./header.css";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../constants/routes";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Menu from "@mui/icons-material/Menu";

const Header = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Box className="header">
        <NavLink to={AppRoutes.LOGIN}>
          <Box className="header-logo-image">
            <img src={loginHeading} alt="HalloDoc" />
          </Box>
        </NavLink>

        <Box className="header-user-detail">
          <Typography>Welcome</Typography>
          <NavLink to={AppRoutes.LOGIN}>
            <Button
              name="Log Out"
              variant="outlined"
              size="medium"
              className="log-out-btn"
            />
          </NavLink>
          <Button variant="outlined" size="large" className="dark-btn icon-btn">
            <IconButton size="small">
              <DarkModeOutlinedIcon />
            </IconButton>
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="toggle-btn icon-btn"
          >
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
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

      <Drawer open={open} onClose={() => setOpen(false)}>
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
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: "pointer" }}
          >
            Close
          </Typography>
          <CloseOutlinedIcon id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <List
          component="nav"
          sx={{
            flex: "none",
            fontSize: "xl",
            "& > div": { justifyContent: "center" },
          }}
        >
          <ListItemButton>
            <NavLink
              to={AppRoutes.DASHBOARD}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </ListItemButton>
          <ListItemButton>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Provider Location
            </NavLink>
          </ListItemButton>
          <ListItemButton>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              My Profile
            </NavLink>
          </ListItemButton>
          <ListItemButton>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Providers
            </NavLink>
          </ListItemButton>
          <ListItemButton>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Partners
            </NavLink>
          </ListItemButton>
          <ListItemButton>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Access
            </NavLink>
          </ListItemButton>
          <ListItemButton>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Records
            </NavLink>
          </ListItemButton>
          <ListItemButton>
            <NavLink
              to={AppRoutes.LOGIN}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Log Out
            </NavLink>
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
