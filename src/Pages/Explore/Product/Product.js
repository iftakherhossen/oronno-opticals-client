import { Grid, Typography, Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';

const Product = ({ product, setOrderSuccess }) => {
    const { title, img, price, stock } = product;
    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    return (
        <Box>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={1} sx={{ py: 3, m: 3, width: 320, textAlign: 'center' }} className="cardHover">
                    <img src={img} alt="product" className="cardImg" draggable="false" />
                    <Typography sx={{ color: '#282c34', fontWeight: 600 }} variant="h5" gutterBottom component="div">
                        {title}
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                        $ {price}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="div">
                        {stock <= 10 ? <span style={{color: 'red'}}>Available - {stock} <small>Pcs</small></span> : <span>Available - {stock} <small>Pcs</small></span>}
                    </Typography>
                    {
                        stock === 0 ?
                        <Typography variant="h6" sx={{ color: '#282c34', fontWeight: 'bold', mt: 2, pt: 1.1 }}>Out of Stock</Typography> :
                        <Button variant="contained" sx={{ bgcolor: '#282c34', color: 'white', fontWeight: 'bold', mt: 2, px: 3 }} onClick={handleModalOpen}>Buy Now</Button>
                    }
                </Paper>
            </Grid>

            <BookingModal
                product={product}
                openModal={openModal}
                handleModalClose={handleModalClose}
                setOrderSuccess={setOrderSuccess}
            />
        </Box>
    );
};

export default Product;