import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({children, ...rest}) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <Box sx={{ display: 'flex' }}>
            {isLoading &&  <CircularProgress color="inherit" />}
        </Box>
    }
    return (
        <Route
            {...rest}
            render={({ location }) => 
                user.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;