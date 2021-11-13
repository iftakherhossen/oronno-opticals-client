import { Grid, Typography, Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Product = ({ product, handleBuyNow }) => {
    const { title, img, price } = product;

    return (
        <Box>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ py: 3, m: 3, width: 320, textAlign: 'center' }}>
                    <img src={img} alt="product" className="cardImg" />
                    <Typography sx={{ color: '#282c34', fontWeight: 600 }} variant="h5" gutterBottom component="div">
                        {title}
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                        $ {price}
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: '#282c34', color: 'white', fontWeight: 'bold', mt: 2, px: 3 }} onClick={() => handleBuyNow(product)}>Buy Now</Button>
                </Paper>
            </Grid>
        </Box>
    );
};

export default Product;