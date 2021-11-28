import { Grid, Typography, Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import BookingModal from '../../Explore/BookingModal/BookingModal';

const Explored = ({ product, setOrderSuccess }) => {
    const { title, img, description, price } = product;

    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

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
                        <Button variant="contained" sx={{ bgcolor: '#282c34', color: 'white', fontWeight: 'bold', px: 3 }} onClick={handleModalOpen}>Buy Now</Button>
                    </Paper>
                </Grid>

                <BookingModal
                    product={product}
                    openModal={openModal}
                    handleModalClose={handleModalClose}
                    setOrderSuccess={setOrderSuccess}
                ></BookingModal>
            </Box>
        </div>
    );
};

export default Explored;