import { Typography, Container, Grid} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const AboutUs = () => {
    return (
        <div id="aboutUs">
            <Container>
                <Box sx={{my: 5, textAlign: 'center'}}>
                    <Typography variant="h4">About Us</Typography>
                </Box>

                <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid xs={12} sm={12} md={6} sx={{ m: 'auto' }}>
                        <img src="" alt="founder" />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} sx={{ m: 'auto' }}>
                        <Box>
                            <Typography paragraph>

                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default AboutUs;