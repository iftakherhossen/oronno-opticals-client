import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/system';
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
            <Typography variant="h4" sx={{ mb: 2 }}>Manage All Orders - {order.length}</Typography>

            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Order Id</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Payment Status</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map(({ _id, date, name, email, address, title, quantity, paymentStatus, status }) => (
                            <TableRow
                                key={_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {date}
                                </TableCell>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    <a href={`${email}`}><EmailIcon /></a>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' }}>
                                    {address}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {title}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {_id}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {quantity}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {paymentStatus === true ? 'Paid' : 'Not Paid'}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {status || ((date.slice(0, 2) * 1 + 7) <= (today * 1)) ? <Button disabled sx={{bgcolor: '#eee'}}>Done</Button> : <Button onClick={() => handleDone(order._id)}>Done</Button>}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {status || ((date.slice(0, 2) * 1 + 3) <= (today * 1)) ? <Button disabled sx={{bgcolor: '#eee', color: '#eee', cursor: 'not-allowed'}}>Cancel</Button> : <Button onClick={() => handleCancel(order._id)}>Cancel</Button>}
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