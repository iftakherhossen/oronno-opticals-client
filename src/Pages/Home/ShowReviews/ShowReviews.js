import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ShowReview from '../ShowReview/ShowReview';

const ShowReviews = () => {
     const [reviews, setReviews] = useState([]);

     useEffect(() => {
          fetch('')
               .then(res => res.json())
               .then(data => setReviews(data));
     }, [])

     return (
          <div id="reviews">
               <Box>
                    <Container>
                         <Box sx={{ textAlign: 'center', pb: 4 }}>
                              <Typography variant="h4">What People Think About Us!</Typography>
                         </Box>
                         <Box>
                              <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                   {
                                        reviews.map(review => <ShowReview
                                             key={review._id}
                                             reviews={review}
                                        />)
                                   }
                              </Grid>

                         </Box>
                    </Container>
               </Box>
          </div>
     );
};

export default ShowReviews;