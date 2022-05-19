import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import Swal from 'sweetalert2';

const MyOrders = () => {
     const [myOrder, setMyOrder] = useState([]);
     const { user } = useAuth();

     useEffect(() => {
          fetch(`https://boiling-spire-70151.herokuapp.com/orders/${user.email}`)
               .then(res => res.json())
               .then(data => setMyOrder(data));
     }, [user.email])

     const handleCancel = id => {
          const url = `https://boiling-spire-70151.herokuapp.com/orders/${id}`
          fetch(url, {
               method: 'DELETE'
          })
               .then(res => res.json())
               .then(data => {
                    Swal.fire({
                         title: 'Are you sure?',
                         text: "You won't be able to revert this!",
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Yes, delete it!',
                         reverseButtons: true
                       }).then((result) => {
                         if (result.isConfirmed) {
                           Swal.fire(
                             'Deleted!',
                             'Order has been deleted.',
                             'success'
                           )
                             if (data.deletedCount) {
                                 const remaining = myOrder.filter(order => order._id !== id);
                                 setMyOrder(remaining)
                             }
                         }
                         else if (result.dismiss === Swal.DismissReason.cancel) {
                             Swal.fire(
                                 'Cancelled',
                                 'Your order is safe :)',
                                 'error'
                             )
                             setMyOrder(myOrder);
                         }
                       })
               })
     }

     return (
          <div>
               <h2>My Orders</h2>

               {
                    myOrder.length === 0 ? <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                         <img src="https://i.ibb.co/Q8ZFkm6/empty.png" alt="Not Found Any Orders" draggable={false} />
                    </Box> : <TableContainer component={Paper}>
                         <Table sx={{ width: '100%' }} aria-label="simple table">
                              <TableHead>
                                   <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Order Id</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {myOrder.map((order) => (
                                        <TableRow
                                             key={order._id}
                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                             <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                  {order.date}
                                             </TableCell>
                                             <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                  {order.name}
                                             </TableCell>
                                             <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                  <a href={`${order.email}`}><EmailIcon /></a>
                                             </TableCell>
                                             <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' }}>
                                                  {order.address}
                                             </TableCell>
                                             <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                  {order.title}
                                             </TableCell>
                                             <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                  {order._id}
                                             </TableCell>
                                             <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                  {order.quantity ? order.quantity : 1}
                                             </TableCell>
                                             <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                  {order.status ? 'Done' : 'Pending'}
                                             </TableCell>
                                             {order.status ?
                                                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                       <Button disabled>Cancel</Button>
                                                  </TableCell>
                                                  :
                                                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                                       <Button onClick={() => handleCancel(order._id)}>Cancel</Button>
                                                  </TableCell>
                                             }
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </TableContainer>
               }

               <Box sx={{ mt: 10, textAlign: 'center' }}>
                    <Link to="/explore" className="text-decoration-none text-white">
                         <Button variant="contained" className="customBgColor">
                              {myOrder.length === 0 ? 'Buy Now' : 'Shop More'}
                         </Button>
                    </Link>
               </Box>
          </div>
     );
};

export default MyOrders;