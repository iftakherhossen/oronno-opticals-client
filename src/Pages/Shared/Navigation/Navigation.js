import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, logOut } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" className="customBgColor text-white">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              fontSize: "1.7rem",
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
            }}
            className="name"
          >
            Oronno Opticals
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/explore" style={{ textDecoration: "none" }}>
                  Explore
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  Dashboard
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontWeight: 600,
              fontSize: "1.7rem",
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
            }}
            className="name"
          >
            Oronno Opticals
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button href="/" className="navBtn">
              Home
            </Button>
            <Button href="/explore" className="navBtn">
              Explore
            </Button>
            <Button href="/dashboard" className="navBtn">
              Dashboard
            </Button>
          </Box>

        <Box>
            
        </Box>

          {user.displayName && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={user.displayName}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Log Out">
                <IconButton sx={{ ml: 1.5 }} onClick={logOut}>
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
