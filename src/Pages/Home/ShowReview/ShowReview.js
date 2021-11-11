import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ShowReview = () => {
    return (
        <Box>
            <Grid xs={1} sm={1} md={6} sx={{ m: 'auto' }}>
                <Paper elevation="2" sx={{ width: 520, my: 2, p: 2 }}>
                    <Typography variant="h3">Hello</Typography>
                </Paper>
            </Grid>
        </Box>
    );
};

export default ShowReview;