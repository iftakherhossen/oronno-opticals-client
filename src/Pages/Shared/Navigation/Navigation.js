import React from 'react';
import { Box } from '@mui/system';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
                        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16, mr: 2 }}>Home</Button></Link>
                        <Link to="/explore" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16 }}>Explore</Button></Link>
                    </Box>

                    {user?.email ? <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16 }}>Dashboard</Button></Link> : <Typography></Typography>}
                    {
                        user?.email ?
                            <Box>
                                <Button color="inherit" sx={{ fontSize: 16, ml: 4, mr: 2 }} onClick={logOut}>Log Out</Button>
                                {
                                    user?.photoURL ? <img src={user?.photoURL} alt={user.displayName} title={user?.displayName} className="nav-avatar" /> : <AccountCircleIcon sx={{ fontSize: 40 }} title={user?.displayName} />
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