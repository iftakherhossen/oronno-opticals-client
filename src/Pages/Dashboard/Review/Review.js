import { CircularProgress, TextField, Typography, Button, Grid, Container, Backdrop } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { HashLink } from 'react-router-hash-link';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Review = () => {
     const { user, isLoading } = useAuth();
     const initialInfo = { name: user.displayName, email: user.email }
     const [reviewInfo, setReviewInfo] = useState(initialInfo);
     const [ratings, setRatings] = useState(0);
     const [reviewSuccess, setReviewSuccess] = useState(false);

     const handleChange = value => {
          setRatings(value);
     }

     const handleOnBlur = e => {
          const field = e.target.name;
          const value = e.target.value;
          const newInfo = { ...reviewInfo };
          newInfo[field] = value;
          setReviewInfo(newInfo);
     }

     const handleSubmit = e => {
          // collect data
          const post = {
               ...reviewInfo,
               ratings
          }
          console.log(post)
          
          // send data to the server
          fetch('https://boiling-spire-70151.herokuapp.com/reviews', {
               method: 'POST',
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(post)
          })
               .then(res => res.json())
               .then(result => {
                    if (result.insertedId) {
                         setReviewSuccess(true);
                         Swal.fire(
                              'Post Successful!',
                              'Thanks For the Review!',
                              'success',
                              '<HashLink to="/home#reviews">See YourReview</HashLink>'
                         )
                    }
               })
           e.preventDefault();
     }

     reviewSuccess && toast.success((t) => (
          <span>
            Successfully Posted! &nbsp;
            <HashLink to="/home#reviews" style={{ textDecoration: 'none' }}>See Your Review!</HashLink>
          </span>
     ), {
          position: "bottom-center"
     });

     return (
          <Box>
               <Typography variant="h4" sx={{ textAlign: 'center', my: 1, mt: { xs: 1, md: 6 }, fontWeight: 600 }}>Review Our Products | Us</Typography>

               <Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 15, lg: 20 }} sx={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
                         <Grid item xs={12} sm={10} md={7} lg={5} sx={{ ml: 'auto', mr: {xs: 'auto', md: 1} }}>
                              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                   <Box sx={{  }}>
                                        <img src="https://i.ibb.co/HFSrx7p/write.png" alt="Review Poster" draggable="false" style={{ display: 'flex', alignItems: 'center' }} />
                                   </Box>
                              </Box>
                         </Grid>
                         <Grid item xs={12} sm={10} md={7} lg={5} sx={{ mr:  'auto', ml: {xs: 'auto', md: 1} }}>
                              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center'}}>
                                   {!isLoading && <form onSubmit={handleSubmit}>
                                        <TextField
                                             value={user.displayName}
                                             variant="standard"
                                             name="name"
                                             type="name"
                                             onBlur={handleOnBlur}
                                             sx={{ width: '100%', mb: 2 }}
                                             required
                                        />
                                        <TextField
                                             value={user.email}
                                             variant="standard"
                                             onBlur={handleOnBlur}
                                             name="email"
                                             type="email"
                                             sx={{ width: '100%', mb: 2 }}
                                             required
                                        />
                                        <TextField
                                             placeholder="Write Your Opinion!"
                                             variant="standard"
                                             name="message"
                                             onBlur={handleOnBlur}
                                             style={{ width: '100%' }}
                                             multiline
                                             type="text"
                                             title="message"
                                             rows={4}
                                             required
                                        />
                                        <ReactStars
                                             count={5}
                                             onChange={handleChange}
                                             size={40}
                                             isHalf={true}
                                             name="ratings"
                                             emptyIcon={<i className="far fa-star"></i>}
                                             halfIcon={<i className="fa fa-star-half-alt"></i>}
                                             fullIcon={<i className="fa fa-star"></i>}
                                             activeColor="#ffd700"
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                             <Button
                                                  type="submit"
                                                  variant="contained"
                                                  sx={{ my: 3 }}
                                                  className="customBgColor"
                                             >Post</Button>
                                        </Box>
                                   </form>}
                              </Box>
                         </Grid>
                         <Container>
                              {isLoading &&  <Box sx={{ width: '100vh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress color="inherit" /></Box>}
                         </Container>
                    </Grid>
               </Box>
          </Box>
     );
};

export default Review;