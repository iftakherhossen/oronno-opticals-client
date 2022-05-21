import { Avatar, Backdrop, Fade, Grid, Modal, Toolbar, Typography } from "@mui/material";
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
     const [userOrderInfo, setUserOrderInfo] = useState([]);

     useEffect(() => {
          fetch(`https://boiling-spire-70151.herokuapp.com/orders/${user.email}`)
               .then(res => res.json())
               .then(data => setUserOrderInfo(data));
     }, [user.email]);

     const lastOrderInfo = () => {
          if (userOrderInfo.length > 0) {
               return userOrderInfo[userOrderInfo.length - 1];
          }
     }

     const id = lastOrderInfo()?._id;
     const date = lastOrderInfo()?.date;
     const price = lastOrderInfo()?.price;
     const status = lastOrderInfo()?.status;
     const payment = lastOrderInfo()?.paymentStatus;

     const paymentMethod = ['bKash', 'Nagad', 'Rocket', 'Visacard', 'Paypal', 'Mastercard', 'American Express'];

     const shuffleArray = array => {
          let i = array.length - 1;
          for (; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               const temp = array[i];
               array[i] = array[j];
               array[j] = temp;
          }
          return array;
     }

     const shuffledMethod = shuffleArray(paymentMethod).slice(0, 1);

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
                                   <Avatar src={user.photoURL} alt={user.displayName} draggable="false" sx={{ borderRadius: 100, boxShadow: 3, width: 100, height: 100 }} />
                                   <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>{user.displayName}</Typography>
                                   <Typography variant="subtitle1">Total Order: {userOrderInfo.length}</Typography>
                              </Box>
                              <Toolbar />                          
                              <Box>    
                                   <Grid container>
                                        <Grid item xs={12}>
                                             <Typography sx={{ fontSize: 19, fontWeight: 600, mb: 1 }}>Last Order Info</Typography>
                                             <Grid container>
                                                  <Grid item xs={12} sx={{ boxShadow: 1, py: 1.5, px: 2, textAlign: 'left', borderRadius: 1 }}>
                                                       <Typography variant="body2" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Order ID:</span> <b>{id}</b></Typography> 
                                                       <Typography variant="body2" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Date:</span> <b>{date}</b></Typography> 
                                                       <Typography variant="body2" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Price:</span> <b>${price}</b></Typography> 
                                                       <Typography variant="body2" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Status:</span> <b>{status ? 'Done' : 'Pending'}</b></Typography> 
                                                       <Typography variant="body2" sx={{display: 'flex', justifyContent: 'space-between'}}><span>Payment:</span> <b>{payment ? `Online Payment (${shuffledMethod})` : 'Cash on Delivery'}</b></Typography> 
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