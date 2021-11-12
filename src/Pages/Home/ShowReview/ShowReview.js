import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';

const ShowReview = ({ reviews }) => {
    const { name, email, review, ratings } = reviews;

    return (
        <Box>
            <Grid xs={12} sm={12} md={6} sx={{ m: 'auto' }}>
                <Paper elevation="2" sx={{ width: 520, my: 2, p: 2, textAlign: 'center', fontStyle: 'italic' }}>
                    <Typography variant="h6">“{review}”</Typography>
                    <Typography variant="body1" sx={{ my: 1 }}><StarIcon /> {ratings}</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'eee' }}>{name}</Typography>
                    <Typography variant="caption" sx={{ color: 'eee' }}>{email}</Typography>
                </Paper>
            </Grid>
        </Box>
    );
};

export default ShowReview;