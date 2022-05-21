import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button, Typography, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/system';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Swal from 'sweetalert2';

const ManageAllOrders = () => {
    const [order, setOrder] = useState([]);
    const date = new Date();
    const today = date.getDate();

    useEffect(() => {
        fetch('https://boiling-spire-70151.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => setOrder(data));
    }, [])

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
                            const remaining = order.filter(order => order._id !== id);
                            setOrder(remaining)
                        }
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                            'Cancelled',
                            'Your order is safe :)',
                            'error'
                        )
                    }
                  })
            })
    }

    const handleDone = (id) => {
        const url = `https://boiling-spire-70151.herokuapp.com/orders/${id}`
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                status: 'Done'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
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
                    confirmButtonText: 'Yes, mark as done!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        'Done!',
                        'Order marked as done!',
                        'success'
                      )
                        if (data.deletedCount) {
                            const remaining = order.filter(order => order._id !== id);
                            setOrder(remaining)
                        }
                    }
                  })
            })
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>Manage All Orders - {order.length}</Typography>                
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Order Id</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Payment Status</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map(({ _id, date, name, email, address, title, quantity, paymentStatus, price, totalPrice, status }) => (
                            <TableRow
                                key={_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {date}
                                </TableCell>
                                <TableCell  align="center" component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span><a href={`${email}`}><EmailIcon /></a></span>
                                        <span><Tooltip title={address}><FmdGoodIcon /></Tooltip></span>
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {title}
                                </TableCell>
                                <TableCell  align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {_id}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {quantity} x ${price}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    ${totalPrice}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {paymentStatus === true ? 'Paid' : 'Not Paid'}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {status || ((date.slice(0, 2) * 1 + 7) <= (today * 1)) ? <Button disabled sx={{bgcolor: '#eee'}}>Done</Button> : <Button onClick={() => handleDone(_id)}>Done</Button>}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {status || ((date.slice(0, 2) * 1 + 3) <= (today * 1)) ? <Button disabled sx={{bgcolor: '#eee', color: '#eee', cursor: 'not-allowed'}}>Cancel</Button> : <Button onClick={() => handleCancel(_id)}>Cancel</Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ManageAllOrders;