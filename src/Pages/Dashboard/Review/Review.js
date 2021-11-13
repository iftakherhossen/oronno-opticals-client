import { CircularProgress, TextField, Typography, Button, Alert, Grid, FormControl, Input, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { HashLink } from 'react-router-hash-link';
const Review = () => {
     const { user, isLoading } = useAuth();
     const [reviewSuccess, setReviewSuccess] = useState(false);
     const { register, handleSubmit, reset, formState: { errors } } = useForm();

     const onSubmit = data => {
          fetch('http://localhost:5000/reviews', {
               method: 'POST',
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(data)
          })
               .then(res => res.json())
               .then(result => {
                    if (result.insertedId) {
                         setReviewSuccess(true);
                         reset();
                    }
               })
     }

     return (
          <Box>
               <Typography variant="h4" sx={{ textAlign: 'center' }}>Review Our Products</Typography>

               <Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                         <Grid item xs={12} sm={8} md={4} sx={{ mx: 'auto' }}>
                              <Box sx={{ textAlign: 'center', my: 4 }}>
                                   {!isLoading && <form onSubmit={handleSubmit(onSubmit)}>
                                        <TextField
                                             defaultValue={user.displayName}
                                             {...register("name")}
                                             variant="standard"
                                             sx={{ width: '100%', mb: 2 }}
                                        />
                                        <TextField
                                             defaultValue={user.email}
                                             {...register("email", { required: true })}
                                             variant="standard"
                                             sx={{ width: '100%', mb: 2 }}
                                        />
                                        {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
                                        <textarea
                                             placeholder="Write Your Opinion!"
                                             defaultValue=""
                                             {...register("review", { required: true })}
                                             variant="standard"
                                             style={{ width: '100%', mb: 2, height: 100 }}
                                        ></textarea>
                                        {errors.review && <span style={{ color: 'red' }}>This field is required</span>}
                                        <FormControl sx={{ width: 1 }} variant="standard">
                                             <Input
                                                  {...register("ratings", { required: true })}
                                                  variant="standard"
                                                  sx={{ width: '100%', mb: 2 }}
                                                  InputProps={{ inputProps: { min: 0, max: 5 } }}
                                                  type="number"
                                                  placeholder="0 - 5"
                                                  startAdornment={<InputAdornment position="start">Rating</InputAdornment>}
                                             />
                                        </FormControl>
                                        {errors.ratings && <span style={{ color: 'red' }}>This field is required</span>}<br />
                                        <Button
                                             type="submit"
                                             variant="contained"
                                             sx={{ my: 3 }}
                                             className="customBgColor"
                                        >Post</Button>
                                   </form>}
                              </Box>
                              <Box>
                                   {isLoading && <CircularProgress />}
                                   {reviewSuccess && <Alert severity="success" sx={{ mt: 3, width: '100%', mx: 'auto', fontWeight: 'bold' }}>Thanks For the Review! <HashLink to="/home#reviews">See YourReview</HashLink></Alert>}
                              </Box>
                         </Grid>
                    </Grid>
               </Box>
          </Box>
     );
};

export default Review;