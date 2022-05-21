import { Container, Grid, Typography, Divider, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SaleProduct from '../SaleProduct/SaleProduct';
const SaleProducts = () => {
     const [product, setProduct] = useState([]);
     const [orderSuccess, setOrderSuccess] = useState(false);

     useEffect(() => {
          fetch('https://boiling-spire-70151.herokuapp.com/products')
               .then(res => res.json())
               .then(data => setProduct(data));
     }, []);
    
     const shuffleArray = array => {
          let i = array.length - 13;
          for (; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               const temp = array[i];
               array[i] = array[j];
               array[j] = temp;
          }
          return array;
     }

     const shuffledProducts = shuffleArray(product).reverse();

     const miliSecondsUntil12Pm = 86400000
     setTimeout(()=> {
          shuffleArray()
          setInterval(()=> {
               shuffleArray()
          }, 86400000) // 24 hours * 60 minutes * 60 seconds * 1000 miliseconds = 86400000 Miliseconds
     }, miliSecondsUntil12Pm)

     orderSuccess && toast.success('Order Placed Successfully!')
     
     return (
          <Box sx={{ my: 3}}>
            <Container>
                <Box sx={{ flexGrow: 1, py: 6, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mt: 2, mb: 2, fontWeight: 600 }}>Products on Sale</Typography>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>Get 10% discount in selected products everyday!</Typography>
                    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} sx={{ pl: 1.5, pt: 2 }}>
                         {
                              shuffledProducts.slice(0, 3).map(product => <SaleProduct
                                   key={product._id}
                                   product={product}
                                   setOrderSuccess={setOrderSuccess}
                              />)
                         }
                    </Grid>
                    <Toolbar />
                    <Divider />
                </Box>
            </Container>
        </Box>
     );
};

export default SaleProducts;