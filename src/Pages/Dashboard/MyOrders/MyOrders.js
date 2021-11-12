import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button } from '@mui/material';

const MyOrders = () => {
     const [myOrder, setMyOrder] = useState([]);
     const { user } = useAuth();
     
     useEffect(() => {
          fetch(`http://localhost:5000/orders/${user.email}`)
               .then(res => res.json())
               .then(data => setMyOrder(data));
     }, [user.email])

     const handleCancel = id => {
          const url = `http://localhost:5000/orders/${id}`
          fetch(url, {
               method: 'DELETE'
          })
               .then(res => res.json())
               .then(data => {
                    console.log(data);
                    const confirm = window.confirm('Are you sure? You wanna cancel this Order!')

                    if (confirm === true) {
                         if (data.deletedCount) {
                              alert('Deleted Successfully!')
                              const remaining = myOrder.filter(order => order._id !== id);
                              setMyOrder(remaining)
                         }
                    }
               })
     }

     return (
          <div>
               <h2>My Orders</h2>

               <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                         <TableHead>
                              <TableRow>
                                   <TableCell>Name</TableCell>
                                   <TableCell align="center">Email</TableCell>
                                   <TableCell align="center">Address</TableCell>
                                   <TableCell align="center">Order Id</TableCell>
                                   <TableCell>Quantity</TableCell>
                                   <TableCell align="center">Status</TableCell>
                                   <TableCell align="center">Action</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {myOrder.map((order) => (
                                   <TableRow
                                        key={order.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                   >
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                             {order.name}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>{order.email}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>{order.address}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>{order._id}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>{Object.keys(order.order).length}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>{order.status}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                             <Button onClick={() => handleCancel(order._id)}>Cancel</Button>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
          </div>
     );
};

export default MyOrders;