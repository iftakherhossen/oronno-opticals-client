import { Container, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeProduct from '../HomeProduct/HomeProduct';

const HomeProducts = () => {
    const [product, setProduct] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        fetch('https://boiling-spire-70151.herokuapp.com/limitedProducts')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])


    return (
        <Box>
            <Container>
                <Box sx={{ flexGrow: 1, py: 6, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ my: 2 }}>Stay Safe & Buy Online</Typography>
                    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} sx={{ pl: 1.5, pt: 2 }}>
                        {
                            product.map(product => <HomeProduct
                                key={product._id}
                                product={product}
                                setOrderSuccess={setOrderSuccess}
                            />)
                        }
                    </Grid>
                    <Box sx={{ mx: 'auto', my: 4 }}>
                        <Link to="/explore" style={{ textDecoration: 'none' }}><Button variant="contained" sx={{ bgcolor: '#282c34', px: 3 }}>Explore More!</Button></Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HomeProducts;