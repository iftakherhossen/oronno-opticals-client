import { Container, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import HomeProduct from '../HomeProduct/HomeProduct';

const HomeProducts = () => {
    const [product, setProduct] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        fetch('https://boiling-spire-70151.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);
    
    const shuffleArray = array => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const shuffledProducts = shuffleArray(product);

    orderSuccess && toast.success('Order Placed Successfully!')

    return (
        <Box>
            <Container>
                <Box sx={{ flexGrow: 1, pb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mb: 6, fontWeight: 600 }}>Featured Products</Typography>
                    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} sx={{ pl: 1.5, pt: 2 }}>
                        {
                            shuffledProducts.slice(0, 6).map(product => <HomeProduct
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