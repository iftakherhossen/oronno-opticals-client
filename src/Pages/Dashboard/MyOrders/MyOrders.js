import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button, Tooltip, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CancelIcon from '@mui/icons-material/Cancel';

const MyOrders = () => {
    const [myOrder, setMyOrder] = useState([]);
    const { user } = useAuth();
    const date = new Date();
    const today = date.getDate();

     useEffect(() => {
        fetch(`https://boiling-spire-70151.herokuapp.com/orders/${user.email}`)
          .then((res) => res.json())
          .then((data) => setMyOrder(data));
     }, [user.email]);

     const handleCancel = (id) => {
          const url = `https://boiling-spire-70151.herokuapp.com/orders/${id}`;
          fetch(url, {
               method: "DELETE",
          })
               .then((res) => res.json())
               .then((data) => {
                    Swal.fire({
                         title: "Are you sure?",
                         text: "You won't be able to revert this!",
                         icon: "warning",
                         showCancelButton: true,
                         confirmButtonColor: "#3085d6",
                         cancelButtonColor: "#d33",
                         confirmButtonText: "Yes, delete it!",
                         reverseButtons: true,
                    }).then((result) => {
                         if (result.isConfirmed) {
                              Swal.fire(
                                   "Deleted!",
                                   "Order has been deleted.",
                                   "success"
                              );
                              if (data.deletedCount) {
                                   const remaining = myOrder.filter(
                                        (order) => order._id !== id
                                   );
                                   setMyOrder(remaining);
                              }
                         } else if (
                              result.dismiss === Swal.DismissReason.cancel
                         ) {
                              Swal.fire(
                                   "Cancelled",
                                   "Your order is safe :)",
                                   "error"
                              );
                              setMyOrder(myOrder);
                         }
                    });
               });
     };

     return (
          <div>
               <h2>My Orders</h2>

               {myOrder.length === 0 ? (
                    <Box
                         sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                         }}
                    >
                         <img
                              src="https://i.ibb.co/Q8ZFkm6/empty.png"
                              alt="Not Found Any Orders"
                              draggable={false}
                         />
                    </Box>
               ) : (
                    <TableContainer component={Paper}>
                         <Table
                              sx={{ width: "100%" }}
                              aria-label="simple table"
                         >
                              <TableHead>
                                   <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="center">
                                             Title
                                        </TableCell>
                                        <TableCell align="center">
                                             Order Id
                                        </TableCell>
                                        <TableCell align="center">
                                             Quantity
                                        </TableCell>
                                        <TableCell align="center">
                                             Price
                                        </TableCell>
                                        <TableCell align="center">
                                             Status
                                        </TableCell>
                                        <TableCell align="center">
                                             Payment
                                        </TableCell>
                                        <TableCell align="center">
                                             Action
                                        </TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {myOrder.map(
                                        ({
                                             _id,
                                             date,
                                             title,
                                             price,
                                             quantity,
                                             totalPrice,
                                             status,
                                             paymentMethod,
                                        }) => (
                                             <TableRow
                                                  key={_id}
                                                  sx={{
                                                       "&:last-child td, &:last-child th":
                                                            { border: 0 },
                                                  }}
                                             >
                                                  <TableCell
                                                       component="th"
                                                       scope="row"
                                                       sx={{
                                                            fontWeight: "bold",
                                                            fontSize: 16,
                                                       }}
                                                  >
                                                       {date}
                                                  </TableCell>
                                                  <TableCell
                                                       align="center"
                                                       sx={{
                                                            fontWeight: "bold",
                                                            fontSize: 16,
                                                       }}
                                                  >
                                                       {title}
                                                  </TableCell>
                                                  <TableCell
                                                       align="center"
                                                       sx={{
                                                            fontWeight: "bold",
                                                            fontSize: 16,
                                                       }}
                                                  >
                                                       {_id}
                                                  </TableCell>
                                                  <TableCell
                                                       align="center"
                                                       sx={{
                                                            fontWeight: "bold",
                                                            fontSize: 16,
                                                       }}
                                                  >
                                                       {quantity} x ${price}
                                                  </TableCell>
                                                  <TableCell
                                                       align="center"
                                                       sx={{
                                                            fontWeight: "bold",
                                                            fontSize: 16,
                                                       }}
                                                  >
                                                       ${totalPrice}
                                                  </TableCell>
                                                  <TableCell
                                                       align="center"
                                                       sx={{
                                                            fontWeight: "bold",
                                                            fontSize: 16,
                                                       }}
                                                  >
                                                       {status ||
                                                       date.slice(0, 2) * 1 +
                                                            7 <=
                                                            today * 1
                                                            ? "Done"
                                                            : "Pending"}
                                                  </TableCell>
                                                  <TableCell
                                                       align="center"
                                                       sx={{
                                                            fontWeight: "bold",
                                                            fontSize: 16,
                                                       }}
                                                  >
                                                       {paymentMethod}
                                                  </TableCell>
                                                  <TableCell align="center">
                                                       <Box
                                                            sx={{
                                                                 display: "flex",
                                                                 justifyContent:
                                                                      "space-evenly",
                                                            }}
                                                       >
                                                            {status ||
                                                            date.slice(0, 2) *
                                                                 1 +
                                                                 7 <=
                                                                 today * 1 ? (
                                                                 <Tooltip title="It's dummy">
                                                                      <Button
                                                                           disabled
                                                                           sx={{
                                                                                bgcolor: "#eee",
                                                                                color: "#eee",
                                                                                cursor: "not-allowed",
                                                                           }}
                                                                      >
                                                                           Track
                                                                           Order
                                                                      </Button>
                                                                 </Tooltip>
                                                            ) : (
                                                                 <Tooltip title="It's dummy">
                                                                      <Button>
                                                                           Track
                                                                           order
                                                                      </Button>
                                                                 </Tooltip>
                                                            )}
                                                            {paymentMethod ===
                                                                 "Online Payment" && (
                                                                 <Button>
                                                                      Pay
                                                                 </Button>
                                                            )}
                                                            {status ||
                                                            date.slice(0, 2) *
                                                                 1 +
                                                                 3 <=
                                                                 today * 1 ? (
                                                                 <IconButton
                                                                      disabled
                                                                      sx={{
                                                                           bgcolor: "#eee",
                                                                           color: "#eee",
                                                                           cursor: "not-allowed",
                                                                      }}
                                                                 >
                                                                      <CancelIcon />
                                                                 </IconButton>
                                                            ) : (
                                                                 <IconButton
                                                                      onClick={() => handleCancel(_id)}
                                                                 >
                                                                      <CancelIcon sx={{ color: 'red' }} />
                                                                 </IconButton>
                                                            )}
                                                       </Box>
                                                  </TableCell>
                                             </TableRow>
                                        )
                                   )}
                              </TableBody>
                         </Table>
                    </TableContainer>
               )}

               <Box sx={{ mt: 10, textAlign: "center" }}>
                    <Link
                         to="/explore"
                         className="text-decoration-none text-white"
                    >
                         <Button variant="contained" className="customBgColor">
                              {myOrder.length === 0 ? "Buy Now" : "Shop More"}
                         </Button>
                    </Link>
               </Box>
          </div>
     );
};

export default MyOrders;
