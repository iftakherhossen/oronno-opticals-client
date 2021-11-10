import { Container, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeProduct from '../HomeProduct/HomeProduct';

const HomeProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/limitedProducts')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])
    
    return (
        <Box>
            <Container>
                <Box sx={{ flexGrow: 1, py: 6, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ my: 2 }}>Stay Safe & Buy Online</Typography>
                    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pl: 1.5, pt: 2 }}>
                        {
                            products.map(product => <HomeProduct
                                key={product._id}
                                products={product}
                            />)
                        }
                        <Box sx={{ mx: 'auto', my: 4 }}>
                            <Link to="/explore" style={{ textDecoration: 'none' }}><Button variant="contained" sx={{ bgcolor: '#282c34', px: 3 }}>Explore More!</Button></Link>
                        </Box>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default HomeProducts;