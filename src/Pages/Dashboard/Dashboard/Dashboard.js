import { Typography, CssBaseline, AppBar, Button, Drawer, List, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from '../../../hooks/useAuth';
import { Switch, Link, Route, useRouteMatch } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import MakeAdmin from '../MakeAdmin/MakeAdmin'
import MyOrders from '../MyOrders/MyOrders';
import Pay from '../Pay/Pay';
import Review from '../Review/Review';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import AddProducts from '../AddProducts/AddProducts';
import ManageProducts from '../ManageProducts/ManageProducts';

const drawerWidth = 250;

const Dashboard = props => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    let { path, url } = useRouteMatch();
    const { user, admin, logOut } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{ backgroundColor: '#282c34', height: '100%', border: 0, px: 'auto', textAlign: 'center' }}>
            <Box sx={{ mt: 6, mb: 2 }}>
                {
                    user?.photoURL ? <img src={user?.photoURL} alt={user.displayName} title={user?.displayName} className="avatar" /> : <AccountCircleIcon sx={{ fontSize: 90, color: '#ddd' }} title={user?.displayName} />
                }
            </Box>
            <List>
                <Link to={`${url}`} style={{ color: 'white', textDecoration: 'none' }}>
                    <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>My Orders</Button>
                </Link>
                <Link to={`${url}/pay`} style={{ color: 'white', textDecoration: 'none' }}>
                    <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Payment</Button>
                </Link>
                <Link to={`${url}/review`} style={{ color: 'white', textDecoration: 'none' }}>
                    <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Review Us</Button>
                </Link>
                {admin && <Box>
                    <Link to={`${url}/makeAdmin`} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Make Admin</Button>
                    </Link>
                    <Link to={`${url}/manageAllOrders`} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '100%', py: 1 }}>Manage All Orders</Button>
                    </Link>
                    <Link to={`${url}/addProducts`} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '70%', py: 1 }}>Add Products</Button>
                    </Link>
                    <Link to={`${url}/manageProducts`} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ fontSize: 18, width: '100%', py: 1 }}>Manage Products</Button>
                    </Link>
                </Box>}
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
                <Switch>
                    <Route exact path={path}>
                        <MyOrders />
                    </Route>
                    <Route path={`${path}/pay`}>
                        <Pay />
                    </Route>
                    <Route path={`${path}/review`}>
                        <Review />
                    </Route>
                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageAllOrders`}>
                        <ManageAllOrders />
                    </AdminRoute>
                    <AdminRoute path={`${path}/addProducts`}>
                        <AddProducts />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageProducts`}>
                        <ManageProducts />
                    </AdminRoute>
                </Switch>
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