import { Typography, Container, Grid ,Button} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const EyeCare = () => {
    return (
        <div id="eyeCare">
            <Container>
                <Grid container spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{py: 12}}>
                    <Grid xs={12} sm={12} md={6} sx={{ m: 'auto', p: 3 }}>
                        <img src="https://i.ibb.co/qD3QBXX/eye-care.jpg" alt="Banner" style={{width: '100%'}} />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} sx={{ m: 'auto', p: 3 }}>
                        <Box>
                            <Typography variant="h4">Get an Free Eye Care Test at our Shop</Typography>
                            <Typography paragraph sx={{my: 3}}>
                                We provide free eye care test on every Monday & Wednesday. We have professional doctor's for check up. You can book an appointment on online. Free checkups are available in all branches!
                            </Typography>
                            <Button className="customBgColor text-white px-3">Book Appointment</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default EyeCare;