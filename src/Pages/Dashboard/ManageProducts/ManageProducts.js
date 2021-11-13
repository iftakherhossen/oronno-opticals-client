import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    const handleRemove = id => {
        const url = `http://localhost:5000/products/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const confirm = window.confirm('Are you sure? You wanna delete this product!')

                if (confirm === true) {
                    if (data.deletedCount) {
                        alert('Deleted Successfully!')
                        const remaining = products.filter(order => order._id !== id);
                        setProducts(remaining)
                    }
                }
            })
        console.log(id)
    }

    return (
        <div>
            <h2>Manage Products</h2>

            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell align="center">Product Image</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Product Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {product._id}
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}><a href={`${product.img}`}>Image</a></TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>{product.title}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>{product.price}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                    <Button onClick={() => handleRemove(product._id)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{textAlign: 'center', pt: 5}}>
                <Link to="/dashboard/addProducts" className="text-decoration-none text-white"><Button variant="contained" className="customBgColor">Add Products</Button></Link>
            </Box>
        </div>
    );
};

export default ManageProducts;