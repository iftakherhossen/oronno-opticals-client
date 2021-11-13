import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';

const ManageAllOrders = () => {
    const [order, setOrder] = useState([]);

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
                console.log(data);
                const confirm = window.confirm('Are you sure? You wanna cancel this Order!')

                if (confirm === true) {
                    if (data.deletedCount) {
                        alert('Deleted Successfully!')
                        const remaining = order.filter(order => order._id !== id);
                        setOrder(remaining)
                    }
                }
            })
    }

    return (
        <div>
            <h2>Manage All Orders</h2>

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
                        {order.map((order) => (
                            <TableRow
                                key={order.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {order.name}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}><a href={`${order.email}`}><EmailIcon /></a></TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>{order.address}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>{order._id}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>{Object.keys(order.order).length}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    <select>
                                        <option>{order.status}</option>
                                        <option>Shipped</option>
                                        <option>Canceled</option>
                                    </select>
                                </TableCell>
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

export default ManageAllOrders;