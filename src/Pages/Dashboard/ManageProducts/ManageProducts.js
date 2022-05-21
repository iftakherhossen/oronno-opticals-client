import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://boiling-spire-70151.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    const handleRemove = id => {
        const url = `https://boiling-spire-70151.herokuapp.com/products/${id}`;
        
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
                            const remaining = products.filter(order => order._id !== id);
                            setProducts(remaining)
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

    return (
        <div>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Manage Products - {products.length}</Typography>

            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell align="center">Product Image</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Product Price</TableCell>
                            <TableCell align="center">Product Stock</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(({_id, img, price, title, stock}) => (
                            <TableRow
                                key={_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {_id}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}><a href={`${img}`}>Image</a></TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>{title}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>$ {price}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>{stock} <small>Pcs</small></TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16, display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Button onClick={() => handleRemove(_id)}>Remove</Button>
                                    <Tooltip title="It's dummy!"><Button>Restock</Button></Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ textAlign: 'center', pt: 5 }}>
                <Link to="/dashboard/add-new-products" className="text-decoration-none text-white"><Button variant="contained" className="customBgColor">Add Products</Button></Link>
            </Box>
        </div>
    );
};

export default ManageProducts;