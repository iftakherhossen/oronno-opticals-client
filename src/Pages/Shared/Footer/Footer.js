import { Box } from '@mui/system';
import { Container, Grid, TextField, Typography, Button, Divider } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Box sx={{bgcolor: '#eee'}}>
            <Container sx={{ pt: 8 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h5" sx={{ mb: 1 }}>London</Typography>
                            <Typography variant="body1">
                                One Euston Square <br />
                                40 Melton Street <br />
                                London <br />
                                NW1 2FD <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h5" sx={{ mb: 1 }}>New York</Typography>
                            <Typography variant="body1">
                                810 Broadway <br />
                                Bowwow Factory <br />
                                New York <br />
                                NY 10012 <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h5" sx={{ mb: 1 }}>Toronto</Typography>
                            <Typography variant="body1">
                                2610 Buffalo <br />
                                Benagil Street <br />
                                Toronto <br />
                                TR 94103 <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h5" sx={{ mb: 1 }}>Subscribe</Typography>
                            <TextField
                                id="standard-basic-email"
                                label="Enter Your Email"
                                type="email"
                                name="email"
                                variant="standard"
                                sx={{ width: '100%', mb: 2 }} />
                            <Button sx={{ color: '#282c34' }}>SUBSCRIBE</Button>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 5, p: 2, textAlign: 'center' }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="subtitle1" sx={{color: '#aaa'}}>© Oronno Opticals 2022, Iftakher Hossen, a Programming Hero initiative.</Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;