import { Backdrop, Fade, Grid, Modal, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import useAuth from "../../../hooks/useAuth";

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 450,
     bgcolor: 'white',
     boxShadow: 24,
     p: 4,
     textAlign: 'center',
     borderRadius: 1,
};

const ProfileModal = ({ openProfileModal, handleCloseProfileModal }) => {
     const { user } = useAuth();
     // const [userInfo, setUserInfo] = useState([]);

     // useEffect(() => {
     //      fetch(`https://boiling-spire-70151.herokuapp.com/users/email=${user.email}`)
     //           .then(res => res.json())
     //           .then(data => setUserInfo(data));
     // }, [user.email]);

     return (
          <Box>
               <Modal
                    open={openProfileModal}
                    onClose={handleCloseProfileModal}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                         timeout: 500,
                    }}
               >
                    <Fade in={openProfileModal}>
                         <Box sx={style}>                              
                              <Box sx={{ px: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                   <img src={user.img} alt={user.displayName} draggable="false" />
                                   <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>{user.displayName}</Typography>
                                   <Typography variant="subtitle1">Total Order: 6</Typography>
                              </Box>
                              <Toolbar />                          
                              <Box>    
                                   <Grid container>
                                        <Grid item xs={12}>
                                             <Typography sx={{ fontSize: 19, fontWeight: 600, mb: 2 }}>Last Order Info</Typography>
                                             <Grid container>
                                                  <Grid item xs={12} sx={{ boxShadow: 1, py: 1, px: 2, textAlign: 'left', borderRadius: 1 }}>
                                                       <Typography variant="body1" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Order ID:</span> <span>#123456789</span></Typography> 
                                                       <Typography variant="body1" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Date:</span> <span>12/3/4567</span></Typography> 
                                                       <Typography variant="body1" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Price:</span> <span>$789</span></Typography> 
                                                       <Typography variant="body1" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Status:</span> <span>Done</span></Typography> 
                                                  </Grid>
                                             </Grid>
                                        </Grid>
                                   </Grid>
                              </Box>
                         </Box>
                    </Fade>
               </Modal>
          </Box>
     );
};

export default ProfileModal;