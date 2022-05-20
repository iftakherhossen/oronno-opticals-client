import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const SingleItem = ({ item }) => {
     const  { title, price, img, stock } = item;

     return (
          <Grid item xs={12} sm={12} md={6} sx={{ p: 1 }}>
               <Grid container sx={{ p: 1, boxShadow: 2, borderRadius: 2, py: 1.5 }}>
                    <Grid item xs={12} sm={3} md={4} className="imgBox">
                         <img 
                              src={img} 
                              alt={title}
                              draggable="false"
                         />
                    </Grid>
                    <Grid item xs={12} sm={9} md={8}>
                         <Box sx={{textAlign: 'left'}}>
                              <Typography variant="h6" sx={{ mb: -0.5 }}>{title}</Typography>
                              <Typography variant="caption">Available - {stock} <small>pcs</small></Typography>
                              <Typography variant="body1"><b>$ {price}</b></Typography>                              
                         </Box>
                    </Grid>
               </Grid>
          </Grid>
     );
};

export default SingleItem;