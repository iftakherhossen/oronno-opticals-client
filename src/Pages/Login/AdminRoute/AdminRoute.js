import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
     const { user, admin, isLoading } = useAuth();

     if (isLoading) {
          return <Box sx={{ display: 'flex' }}>
               {isLoading &&  <CircularProgress color="inherit" />}
          </Box>
     }

     return (
          <Route
               {...rest}
               render={({ location }) =>
                    user.email && admin ? (
                         children
                    ) : (
                         <Redirect
                              to={{
                                   pathname: "/",
                                   state: { from: location }
                              }}
                         />
                    )
               }
          />
     );
};

export default AdminRoute;