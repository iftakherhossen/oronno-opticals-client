import { Container, Typography, Grid, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useCart from '../../../hooks/useCart';
import { addToDb } from '../../../utilities/fakedb';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

const Products = () => {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])

    const handleBuyNow = (product) => {
        const key = product._id;
        const exists = cart.find(pd => pd.key === key);
        let newCart = [];
        if (exists) {
            const rest = cart.filter(pd => pd.key !== key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        // save to local storage (for now)
        addToDb(key);
    }

    return (
        <Box>
            <Container>
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3 }}>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Explore</Typography>
                            <Typography variant="h6" sx={{ mb: 1 }}>Brand New Optical's & Sunglasses</Typography>
                        </Box>
                        <Box>
                            <Link to="/shipping" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" sx={{ bgcolor: '#282c34', color: 'white', fontWeight: 'bold', mt: 2, px: 3 }}>Proceed to Shipping</Button>
                            </Link>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ flexGrow: 1, pt: 5 }}>
                        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pl: 1.5 }}>
                            {
                                product.map(product => <Product
                                    key={product._id}
                                    product={product}
                                    handleBuyNow={() => handleBuyNow(product)}
                                />)
                            }
                        </Grid>
                        <Divider />
                        <Box sx={{ mx: 'auto', my: 4 }}>
                            <Typography variant="h6" sx={{ color: '#282c34' }}>More Coming Soon!!!</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Products;