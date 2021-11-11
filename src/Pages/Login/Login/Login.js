import { Container, Grid, TextField, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLogin = e => {
        loginUser(loginData.email, loginData.password, location, history)
        e.preventDefault();
    }

    return (
        <Box sx={{backgroundImage: 'url(https://i.ibb.co/C60Qdd8/login-bg.jpg)'}}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ mx: 'auto' }}>
                        <form onSubmit={handleLogin} style={{ padding: '95px 0', textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ mb: 3 }} className="customColor">Login</Typography>
                            <TextField
                                id="standard-basic-email"
                                label="Enter Your Email"
                                type="email"
                                name="email"
                                onBlur={handleOnBlur}
                                variant="standard"
                                sx={{ width: '100%', mb: 2 }} /><br />
                            <TextField
                                id="standard-basic-password"
                                type="password"
                                label="Enter Your Password" variant="standard"
                                name="password"
                                onBlur={handleOnBlur}
                                sx={{ width: '100%', mb: 1 }} /><br />
                            <Typography variant="body1" sx={{ color: 'red', cursor: 'pointer' }}>Forget Your Password?</Typography>
                            <br />
                            <Button variant="contained" sx={{ mt: 7 }} className="customBgColor" type="submit"> Login</Button>
                            <NavLink to="/register" style={{ textDecoration: 'none' }} className="customColor"><Typography sx={{ mt: 4 }}>New User? Register Now</Typography></NavLink>

                            {user?.email && <Alert severity="success" sx={{ mt: 3, width: '100%', mx: 'auto', fontWeight: 'bold', textAlign: 'center' }}>Welcome, User</Alert>}
                            {authError && <Alert severity="error" sx={{ mt: 3, width: '100%', mx: 'auto', fontWeight: 'bold', textAlign: 'center' }}>{authError}</Alert>}
                            {isLoading && <CircularProgress />}
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Login;