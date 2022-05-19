import { Box } from '@mui/system';
import { Container, Grid, TextField, Typography, Button, Divider } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
    return (
        <Box sx={{bgcolor: '#eee'}}>
            <Container sx={{ pt: 8 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{mb:3, textAlign: 'center'}}>Visit our shop for more products</Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={3}>
                            <Typography variant="h5" sx={{ mb: 1 }}>London</Typography>
                            <Typography variant="body1">
                                One Euston Square <br />
                                40 Melton Street <br />
                                London <br />
                                NW1 2FD <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                            <Typography variant="h5" sx={{ mb: 1 }}>New York</Typography>
                            <Typography variant="body1">
                                810 Broadway <br />
                                Bowwow Factory <br />
                                New York <br />
                                NY 10012 <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                            <Typography variant="h5" sx={{ mb: 1 }}>Toronto</Typography>
                            <Typography variant="body1">
                                2610 Buffalo <br />
                                Benagil Street <br />
                                Toronto <br />
                                TR 94103 <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
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
                        <Box sx={{ py: 1 }}>
                            <a href="https://www.facebook.com/oronnoOpticals/" className="text-black"><FacebookIcon sx={{fontSize: 28}} /></a>
                            <a href="https://www.instagram.com/oronno_opticals/" className="text-black"><InstagramIcon sx={{fontSize: 28, mx: 1}} /></a>
                            <a href="https://twitter.com/oronno_opticals" className="text-black"><TwitterIcon sx={{fontSize: 28}} /></a>
                            <a href="mailto:info@oronno.opticals.bd" className="text-black"><EmailIcon sx={{fontSize: 28, mx: 1}} /></a>
                            <a href="tel:016600" className="text-black"><PhoneIcon sx={{ fontSize: 25 }} /></a>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="subtitle1" sx={{color: '#aaa'}}>© Oronno Opticals 2022, <a href="https://iftakher-hossen.vercel.app/" target="_blank" rel="noreferrer" style={{color: '#aaa', textDecoration: 'none'}}>Iftakher Hossen</a>, a Programming Hero initiative.</Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;