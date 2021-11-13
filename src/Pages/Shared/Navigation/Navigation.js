import React from 'react';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { HashLink } from 'react-router-hash-link';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Navigation = () => {
    const { user, logOut } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar collapseOnSelect expand="lg" className="customBgColor text-white">
                <Container>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Oronno Opticals</Link>
                    </Typography>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16, mr: 1 }}>Home</Button></Link>
                            <Link to="/explore" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16, mr: 1 }}>Explore</Button></Link>
                            <HashLink to="/home#reviews" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16, mr: 1 }}>Reviews</Button></HashLink>
                        </Nav>
                        <Nav>
                            {user?.email && <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16}}>Dashboard</Button></Link>}
                            {
                                user?.email ?
                                    <Box sx={{ width: 250, display: 'flex', justifyContent: 'between', px: 'auto'}}>
                                        <Button color="inherit" onClick={logOut}><LogoutIcon sx={{ fontSize: 28 }} /></Button>
                                        {
                                            user?.photoURL ? <img src={user?.photoURL} alt={user.displayName} title={user?.displayName} className="nav-avatar" /> : <AccountCircleIcon sx={{ fontSize: 40 }} title={user?.displayName} />
                                        }
                                        {
                                            user?.displayName && <Typography sx={{ fontSize: 16, my: 'auto', ml: 1 }}>{user.displayName}</Typography>
                                        }
                                    </Box>
                                    :
                                    <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit" sx={{ fontSize: 16 }}>Login</Button></Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </Box>
    );
};

export default Navigation;