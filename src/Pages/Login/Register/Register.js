import { Grid, TextField, Typography, Button, CircularProgress, Toolbar, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import GoogleButton from 'react-google-button';

const Login = () => {
    const [registrationData, setRegistrationData] = useState({});
    const { user, registerUser, isLoading, success, authError, signInWithGoogle } = useAuth();
    const [checked, setChecked] = useState(true);

    const handleChange = e => {
        setChecked(e.target.checked);
    }

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegistrationData = { ...registrationData };
        newRegistrationData[field] = value;
        setRegistrationData(newRegistrationData);
    }
    const handleRegister = e => {
        if (registrationData.password !== registrationData.retypePassword) {
            Swal.fire(
                'Password Mismatch',
                'Type same Password in both fields',
                'error'
            );
        }
        else {
            registerUser(registrationData.name, registrationData.email, registrationData.password);            
        }

        e.preventDefault();
    }

    user.email && success && toast.success(`Welcome, ${user.displayName}`);
    authError && toast.error({authError});

    return (
        <Box sx={{ backgroundImage: 'url("https://i.ibb.co/C60Qdd8/login-bg.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Box sx={{ bgcolor: '#282c34c5', height: '100vh' }}>
                <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Grid container sx={{ maxWidth: '60%', bgcolor: '#eee', boxShadow: 5, borderRadius: 5 }}>
                        <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Box sx={{ my: 'auto' }}>
                                    <img src="https://i.ibb.co/7Nh1BfQ/signin-image-removebg-preview.png" alt="SignUp" draggable="false" style={{ width: '100%', margin: '35px 0' }} />
                                </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ my: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Toolbar />
                            <Box>
                                <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Sign in</Typography>
                                </Box>

                                <Box sx={{ height: '100%', maxWidth: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    {!isLoading && <form onSubmit={handleRegister}>
                                        <TextField 
                                            variant='standard'
                                            label='Name'
                                            required
                                            name="name"
                                            type="name"
                                            onBlur={handleOnBlur}
                                            sx={{ width: 1, mb: 1, color: 'white' }}
                                        />
                                        <TextField 
                                            variant='standard'
                                            label='Email'
                                            required
                                            name="email"
                                            type="email"
                                            onBlur={handleOnBlur}
                                            sx={{ width: 1, mb: 1, color: 'white' }}
                                        />
                                        <TextField 
                                            variant='standard'
                                            label='Password'
                                            required
                                            name="password"
                                            onBlur={handleOnBlur}
                                            type="password"
                                            sx={{ width: 1, mb: 1 }}
                                        />
                                        <TextField 
                                            variant='standard'
                                            label='Retype Password'
                                            required
                                            name="retypePassword"
                                            onBlur={handleOnBlur}
                                            type="password"
                                            sx={{ width: 1, mb: 1 }}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 3, ml: 0 }}>
                                            <Checkbox defaultChecked onChange={handleChange} size="small" />
                                            <Typography variant="body1">I agree with the terms and conditions</Typography>
                                        </Box>
                                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                            <Button type="submit" variant="contained" sx={{ px: 3 }} className="customBgColor registerBtn"  disabled={!checked}>Register</Button>
                                        </Box>
                                    </form>}
                                    {isLoading && <Box sx={{ display: 'flex' }}>
                                        <CircularProgress color="inherit" />
                                    </Box>}
                                    <NavLink to="/login" style={{ textDecoration: 'none' }} className="customColor"><Typography sx={{ mt: 3, mb: 1, fontSize: 18, fontWeight: 600 }}>Already User? Login Now!</Typography></NavLink>
                                    <GoogleButton
                                        onClick={signInWithGoogle}
                                        disabled={user.email}
                                    />
                                </Box>
                            </Box>
                            <Toolbar />                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>            
        </Box>
    );
};

export default Login;