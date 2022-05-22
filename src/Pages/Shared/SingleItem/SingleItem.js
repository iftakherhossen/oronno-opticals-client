import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import BookingModal from "../../Explore/BookingModal/BookingModal";

const SingleItem = ({ item, setOrderSuccess, handleCloseSearchModal }) => {
     const { title, price, img, stock } = item;
     const product = item;
     const [openModal, setOpenModal] = useState(false);

     const handleModalOpen = () => setOpenModal(true);
     const handleModalClose = () => setOpenModal(false);

     return (
          <>
               <Grid item xs={12} sm={12} md={6} sx={{ p: 1 }}>
                    <Card>
                         <CardActionArea>  {/* onClick={handleModalOpen} */}
                              <Grid
                                   container
                                   sx={{
                                        p: 1,
                                        boxShadow: 2,
                                        borderRadius: 2,
                                        py: 1.5,
                                   }}
                              >
                                   <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={4}
                                        className="imgBox"
                                   >
                                        <img
                                             src={img}
                                             alt={title}
                                             draggable="false"
                                        />
                                   </Grid>
                                   <Grid item xs={12} sm={9} md={8}>
                                        <Box sx={{ textAlign: "left" }}>
                                             <Typography
                                                  variant="h6"
                                                  sx={{ mb: -0.5 }}
                                             >
                                                  {title}
                                             </Typography>
                                             <Typography variant="caption">
                                                  Available - {stock}
                                                  <small>pcs</small>
                                             </Typography>
                                             <Typography variant="body1">
                                                  <b>$ {price}</b>
                                             </Typography>
                                        </Box>
                                   </Grid>
                              </Grid>
                         </CardActionArea>
                    </Card>
               </Grid>

               <BookingModal
                    product={product}
                    openModal={openModal}
                    handleModalClose={handleModalClose}
                    setOrderSuccess={setOrderSuccess}
                    handleCloseSearchModal={handleCloseSearchModal}
               />
          </>
     );
};

export default SingleItem;
