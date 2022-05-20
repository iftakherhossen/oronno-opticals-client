import { Grid, Typography, Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import BookingModal from '../../Explore/BookingModal/BookingModal';

const SaleProduct = ({ product, setOrderSuccess }) => {
    const { title, img, description, price, stock } = product;    
    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
    const discountedPrice = price - (price * 0.1);

    return (
        <div>
            <Box>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ pb: 4, m: 2, width: 355, height: 510, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                         <img 
                              src={img} 
                              alt="product" 
                              className="cardImg" 
                              draggable="false"
                         />
                         <div>
                              <Typography sx={{ color: '#282c34', fontWeight: 600 }} variant="h5" gutterBottom component="div">
                                   {title}
                              </Typography>
                              <Typography variant="body2" sx={{px: 3}}>{description}</Typography>
                              <Typography variant="h5" gutterBottom component="div" sx={{my: 2}}>
                                   <s>$ {price}</s> <span style={{color: 'red', fontWeight: 'bold'}}>$ {price - (price * 0.1)}</span>
                              </Typography>
                              <Typography variant="body1" gutterBottom component="div">
                                   {stock < 10 ? <span>Available - {stock} <small>Pcs</small></span> : <span>Available - {stock} <small>Pcs</small></span>}
                              </Typography>
                              {
                                   stock === 0 ?
                                   <Typography variant="h6" sx={{ color: '#282c34', fontWeight: 'bold', mt: 2, pt: 1.1 }}>Out of Stock</Typography> :
                                   <Button variant="contained" sx={{ bgcolor: '#282c34', color: 'white', fontWeight: 'bold', mt: 2, px: 3 }} onClick={handleModalOpen}>Buy Now</Button>
                              }
                        </div>
                    </Paper>
                </Grid>

                <BookingModal
                    product={product}
                    openModal={openModal}
                    handleModalClose={handleModalClose}
                    setOrderSuccess={setOrderSuccess}
                    discountedPrice={discountedPrice}
                ></BookingModal>
            </Box>
        </div>
    );
};

export default SaleProduct;