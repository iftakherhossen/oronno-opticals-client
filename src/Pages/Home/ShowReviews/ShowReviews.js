import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ShowReview from '../ShowReview/ShowReview';
import Carousel from 'react-elastic-carousel';

const ShowReviews = () => {
     const [reviews, setReviews] = useState([]);

     useEffect(() => {
          fetch('https://boiling-spire-70151.herokuapp.com/reviews')
               .then(res => res.json())
               .then(data => setReviews(data));
     }, []);

     return (
          <div id="reviews" style={{ padding: '15px 0' }}>
               <Box>
                    <Container>
                         <Box sx={{ textAlign: 'center', pb: 4 }}>
                              <Typography variant="h4">What People Think About Us!</Typography>
                         </Box>
                         <Box>
                              <Grid container spacing={{ xs: 0, md: 0 }}>
                                   <Carousel itemsToShow={1} itemsToScroll={1} showArrows={false} autoPlaySpeed={1000} style={{ cursor: 'grab'}}>
                                        {
                                             reviews.map(reviews => <ShowReview
                                                  key={reviews._id}
                                                  reviews={reviews}
                                             />)
                                        }
                                   </Carousel>
                              </Grid>
                         </Box>
                    </Container>
               </Box>
          </div>
     );
};

export default ShowReviews;