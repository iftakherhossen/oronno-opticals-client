import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';

const Shipping = () => {
    return (
        <Box>
            <Navigation />
            <Container>
                <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Typography variant="h5">Fill the information to order</Typography>
                    <Typography variant="body1" sx={{ my: 1 }}>Wanna Review The <Link to="/dashboard" style={{ textDecoration: 'none' }}>Cart</Link> Again?</Typography>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Shipping;