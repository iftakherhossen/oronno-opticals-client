import { Container, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    return (
        <Box>
            <Container>
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Explore</Typography>
                    <Typography variant="h6">Brand New Opticals & Sungalsses</Typography>

                    <Box sx={{ flexGrow: 1, pt: 5 }}>
                        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pl: 1.5 }}>
                            {
                                products.map(product => <Product
                                    key={product._id}
                                    products={product}
                                />)
                            }
                            <Box sx={{mx: 'auto', my: 4}}>
                                <Typography variant="h6" sx={{ color: '#282c34' }}>More Coming Soon!!!</Typography>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Products;