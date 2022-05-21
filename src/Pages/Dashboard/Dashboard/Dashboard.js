import { Typography, CssBaseline, AppBar, Button, Drawer, List, Toolbar, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from '../../../hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 250;

const Dashboard = props => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, admin, logOut } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{ backgroundColor: '#282c34', height: '100%', border: 0, px: 'auto', textAlign: 'center' }}>
            <Box sx={{ mt: 6, mb: 3, display: 'flex', justifyContent: 'center' }}>
                {
                    <Avatar src={user?.photoURL} alt={user.displayName} title={user?.displayName} className="avatar" draggable="false" sx={{ borderRadius: 100, boxShadow: 3, width: 100, height: 100 }} />
                }
            </Box>
            <List sx={{ minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Home</Button>
                    </Link>
                    <Link to={'/dashboard'} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>My Orders</Button>
                    </Link>
                    <Link to={'/dashboard/payment'} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Payment</Button>
                    </Link>
                    <Link to={'/dashboard/review-us'} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Review Us</Button>
                    </Link>
                    {admin && <Box>
                        <Link to={'/dashboard/manage-all-orders'} style={{ color: 'white', textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ fontSize: 18, width: '100%', py: 1 }}>Manage All Orders</Button>
                        </Link>
                        <Link to={'/dashboard/add-new-products'} style={{ color: 'white', textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Add Products</Button>
                        </Link>
                        <Link to={'/dashboard/manage-products'} style={{ color: 'white', textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ fontSize: 18, width: '100%', py: 1 }}>Manage Products</Button>
                        </Link>
                        <Link to={'/dashboard/manage-users'} style={{ color: 'white', textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ fontSize: 18, width: '100%', py: 1 }}>Manage Users</Button>
                        </Link>
                    </Box>}
                </Box>
                <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1, color: 'white', mt: 5 }} onClick={logOut}>Log Out</Button>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    boxShadow: 'none'
                }}
            >
                <Toolbar sx={{ bgcolor: '#282c34' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        Dashboard
                        {
                            user?.email && <Typography variant="body2" sx={{ color: '#bbb' }}>Welcome, {user.displayName}</Typography>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;