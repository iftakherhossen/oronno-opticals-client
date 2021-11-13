import { Grid, Typography, Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Explored = ({ products, handleBuyNow }) => {
    const { title, img, description, price } = products;

    return (
        <div>
            <Box>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ py: 3, m: 3, width: 340, textAlign: 'center' }}>
                        <img src={img} alt="product" className="cardImg" />
                        <Typography sx={{ color: '#282c34', fontWeight: 600 }} variant="h5" gutterBottom component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{px: 3}}>{description}</Typography>
                        <Typography variant="h5" gutterBottom component="div" sx={{my: 2}}>
                            $ {price}
                        </Typography>
                        <Button variant="contained" sx={{ bgcolor: '#282c34', color: 'white', fontWeight: 'bold', px: 3 }} onClick={handleBuyNow}>Buy Now</Button>
                    </Paper>
                </Grid>
            </Box>
        </div>
    );
};

export default Explored;