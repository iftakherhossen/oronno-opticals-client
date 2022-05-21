import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ReactStars from "react-rating-stars-component";
import React from 'react';

const ShowReview = ({ reviews }) => {
    const { name, email, message, ratings } = reviews;

    return (
        <Box>
            <Grid item xs={12} sm={12} md={12}>
                <Card sx={{ minWidth: 600, maxWidth: '100%', m: 2, p: 2, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontSize: 25, fontStyle: 'italic' }}>“{message}”</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <ReactStars
                                value={ratings}
                                size={30}
                                activeColor="#ffd700"
                                edit={false}
                                isHalf={true}
                            />
                        </Box>
                        <Typography variant="subtitle1" sx={{ color: 'eee', fontSize: 17 }}>{name}</Typography>
                        <Typography variant="caption" sx={{ color: 'eee', fontSize: 14 }}>{email}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    );
};

export default ShowReview;