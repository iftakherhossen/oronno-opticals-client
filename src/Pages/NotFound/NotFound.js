import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Shared/Navigation/Navigation';

const NotFound = () => {
    return (
        <Box>
            <Navigation />
            <Container>
                <Box sx={{ height: '100vh' }}>
                    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ textAlign: 'center', my: 10 }}>
                            <Typography variant="h1" sx={{ color: '#282c34', fontWeight: 600 }}>404</Typography>
                            <Typography variant="h4" sx={{ color: '#282c34' }}>Oops! Page Not Found!</Typography>
                            <Typography variant="body2" sx={{ display: 'block', my: 3 }}>Ok something obviously went wrong here. Try using the navigation at the top to find <br/> something better than this page or check out our most featured products below.</Typography>
                            <Button variant="contained" sx={{ bgcolor: '#282c34', mt: 1}}><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Back to Home</Link></Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default NotFound;