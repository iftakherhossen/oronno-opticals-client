import { Container, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeProduct from '../HomeProduct/HomeProduct';
import useCart from '../../../hooks/useCart';
import { addToDb } from '../../../utilities/fakedb';
import { useHistory } from 'react-router';

const HomeProducts = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const history = useHistory();

    useEffect(() => {
        fetch('https://boiling-spire-70151.herokuapp.com/limitedProducts')
            .then(res => res.json())
            .then(data => setProducts(data));
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

        alert('Go to Explore to continue Shopping, Product added to the cart!');
        history.push('/explore')
    }

    return (
        <Box>
            <Container>
                <Box sx={{ flexGrow: 1, py: 6, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ my: 2 }}>Stay Safe & Buy Online</Typography>
                    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} sx={{ pl: 1.5, pt: 2 }}>
                        {
                            products.map(product => <HomeProduct
                                key={product._id}
                                products={product}
                                handleBuyNow={handleBuyNow}
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