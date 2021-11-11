import { Typography, Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import {  removeFromDb } from '../../../utilities/fakedb';
import Item from '../Item/Item';

const Cart = () => {
    const [cart, setCart] = useCart();

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }

    return (
        <Box sx={{ textAlign: 'center', mx: 'auto' }}>
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">Cart</Typography>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={12} sm={12} md={12}>
                    {
                        cart.map(product => <Item
                            key={product.key}
                            product={product}
                            handleRemove={handleRemove}
                        />)
                    }
                </Grid>
            </Grid>

            <Box sx={{ mx: 'auto', my: 3 }}>
                <Link to="/explore" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{ bgcolor: '#282c34', mx: 1 }}>Shop More</Button>
                </Link>
                <Link to="/shipping" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{ bgcolor: '#282c34', mx: 1 }}>Confirm Order</Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Cart;