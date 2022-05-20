import { Container, Typography, Grid, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = () => {
    const [product, setProduct] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        fetch('https://boiling-spire-70151.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])

    return (
        <Box>
            <Container>
                <Box sx={{ textAlign: 'center', py: 3, mt: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3 }}>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Explore</Typography>
                            <Typography variant="h6" sx={{ mb: 1 }}>Brand New Optical's & Sunglasses</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ flexGrow: 1, pt: 5 }}>
                        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pl: 5.6 }}>
                            {
                                product.map(product => <Product
                                    key={product._id}
                                    product={product}
                                    setOrderSuccess={setOrderSuccess}
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