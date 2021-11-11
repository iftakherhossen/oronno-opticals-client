import React from 'react';
import { Box } from '@mui/system';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { HashLink } from 'react-router-hash-link';

const Navigation = () => {
    const { user, logOut } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#282c34', px: 5, boxShadow: 0 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Oronno Opticals</Link>
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'between', mr: 2 }}>
                        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16 }}>Home</Button></Link>
                        <Link to="/explore" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16, mx: 1 }}>Explore</Button></Link>
                        <HashLink to="/home#reviews" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16 }}>Reviews</Button></HashLink>
                    </Box>

                    {user?.email && <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16 }}>Dashboard</Button></Link>}
                    {
                        user?.email ?
                            <Box sx={{ width: 230, display: 'flex', justifyContent: 'between' }}>
                                <Button color="inherit" sx={{ ml: 2 }} onClick={logOut}><LogoutIcon sx={{ fontSize: 28 }} /></Button>
                                {
                                    user?.photoURL ? <img src={user?.photoURL} alt={user.displayName} title={user?.displayName} className="nav-avatar" /> : <AccountCircleIcon sx={{ fontSize: 40 }} title={user?.displayName} />
                                }
                                {
                                    user?.displayName && <Typography sx={{ fontSize: 20,my: 'auto', ml: 1 }}>{user.displayName}</Typography>
                                }
                            </Box>
                            :
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16 }}>Login</Button></Link>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;