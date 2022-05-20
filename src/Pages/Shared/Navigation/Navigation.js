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
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "../SearchModal/SearchModal";
import ProfileModal from "../ProfileModal/ProfileModal";

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, logOut } = useAuth();
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch('https://boiling-spire-70151.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
  }, []); 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSearchModal = () => setOpenSearchModal(true);
  const handleCloseSearchModal = () => setOpenSearchModal(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  return (
    <>
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
                {user && <MenuItem>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    Dashboard
                  </Link>
                </MenuItem>}
                <MenuItem>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    Contact
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
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button className="navBtn">Home</Button>
              </Link>
              <Link to="/explore" style={{ textDecoration: "none" }}>
                <Button className="navBtn">Explore</Button>
              </Link>
              {user && (
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <Button className="navBtn">Dashboard</Button>
                </Link>
              )}
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Button className="navBtn">Contact</Button>
              </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "space-between", mr: 6 }}>
              <Tooltip title="Search Products">
                <IconButton onClick={handleOpenSearchModal}>
                  <SearchIcon sx={{ color: "white", fontSize: 28 }} />
                </IconButton>
              </Tooltip>
            </Box>

            {user.displayName ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={user.displayName}>
                  <IconButton sx={{ p: 0 }} onClick={handleOpenProfileModal}>
                    <Avatar alt={user.displayName} src={user.photoURL} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Log Out">
                  <IconButton sx={{ ml: 1.5 }} onClick={logOut}>
                    <LogoutIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Button href="/login" className="navBtn">
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <SearchModal
        openSearchModal={openSearchModal}
        handleCloseSearchModal={handleCloseSearchModal}
        products={products}
      />
      <ProfileModal
        openProfileModal={openProfileModal}
        handleCloseProfileModal={handleCloseProfileModal}
      />
    </>
  );
};

export default Navigation;
