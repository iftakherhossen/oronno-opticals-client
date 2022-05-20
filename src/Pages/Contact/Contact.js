import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import Navigation from '../Shared/Navigation/Navigation';

const Contact = () => {
     const {user} = useAuth();
     const form = useRef();
     const [success, setSuccess] = useState(false);

     const sendEmail = (e) => {
          e.preventDefault();
  
          emailjs.sendForm("service_a43ummk", "template_3ymg1lw", form.current, "user_E3AjQo3AWXplLPqSzFb2c")
              .then((result) => {
                  console.log(result.text);
              }, (error) => {
                  console.log(error.text);
              });
          e.target.reset();

          setSuccess(true);
     };
     
     success && Swal.fire(
          'Done!',
          'The message has been sent successfully.',
          'success'
     )

     return (
          <Box sx={{ backgroundImage: 'url("https://i.ibb.co/nC4TtDj/contact-bg.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
               <Navigation />
               <Box sx={{ bgcolor: '#282c34f5', height: '100vh' }}>
                    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                         <Grid container sx={{ maxWidth: '60%', bgcolor: '#eee', boxShadow: 5, borderRadius: 5 }}>
                              <Grid item xs={12} md={5} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                   <Box sx={{ my: 'auto' }}>
                                        <img src="https://i.ibb.co/d5CLQ50/banner.png" alt="logo" draggable="false" style={{ width: '100%' }} />
                                   </Box>
                              </Grid>
                              <Grid item xs={12} md={7} sx={{ my: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                   <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5 }}>Get in Touch</Typography>
                                   </Box>
                                   <Box sx={{ height: '100%', maxWidth: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <form ref={form} onSubmit={sendEmail}>
                                             <TextField 
                                                  variant='standard'
                                                  label='Name'
                                                  value={user.displayName}
                                                  required
                                                  name="name"
                                                  sx={{ width: 1, mb: 2, color: 'white' }}
                                             />
                                             <TextField 
                                                  variant='standard'
                                                  label='Email'
                                                  value={user.email}
                                                  required
                                                  name="email"
                                                  sx={{ width: 1, mb: 2 }}
                                             />
                                             <TextField 
                                                  variant='standard'
                                                  label='Subject'
                                                  required
                                                  name="subject"
                                                  sx={{ width: 1, mb: 2 }}
                                             />
                                             <TextField 
                                                  variant='standard'
                                                  label='Message'
                                                  required
                                                  name="message"
                                                  multiline
                                                  rows={4}
                                                  sx={{ width: 1, mb: 3 }}
                                             />
                                             <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                  <Button type="submit" variant="contained" sx={{ px: 3 }} className="customBgColor">Send</Button>
                                             </Box>
                                        </form>
                                   </Box>
                              </Grid>
                         </Grid>
                    </Box>
               </Box>
          </Box>
     );
};

export default Contact;