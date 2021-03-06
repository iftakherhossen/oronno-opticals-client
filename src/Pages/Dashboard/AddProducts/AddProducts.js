import React, { useState } from 'react';
import { CircularProgress, Container, TextField, Typography, Button, Alert, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProducts = () => {
    const { isLoading } = useAuth();
    const [addProductSuccess, setAddProductSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        fetch('https://boiling-spire-70151.herokuapp.com/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setAddProductSuccess(true);
                    reset();
                }
            })
    }

    addProductSuccess && Swal.fire(
        'Done!',
        'Product Added Successfully!',
        'succcess'
    )

    return (
        <Box>
            <Container>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>Add Products</Typography>

                <Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={12} sm={8} md={4} sx={{ mx: 'auto' }}>
                            <Box sx={{ textAlign: 'center', my: 4 }}>
                                {!isLoading && <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextField
                                        label="Product Name"
                                        {...register("title", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 1.5 }}
                                        required
                                    />
                                    {errors.tile && <span style={{ color: 'red' }}>Product Name is required</span>}
                                    <TextField
                                        label="Product Image Link"
                                        {...register("img", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 1.5 }}
                                        required
                                    />
                                    {errors.img && <span style={{ color: 'red' }}>Product Image is required</span>}
                                    <TextField
                                        label="Product Price"
                                        {...register("price", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 1.5 }}
                                        required
                                    />
                                    {errors.price && <span style={{ color: 'red' }}>Product Price is required</span>}
                                    <TextField
                                        label="Product Stock"
                                        {...register("stock", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 1.5 }}
                                        required
                                    />
                                    {errors.stock && <span style={{ color: 'red' }}>Product Stock is required</span>}
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Product Description"
                                        multiline
                                        rows={4}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 1.5 }}
                                        {...register("description", { required: true })}
                                        required
                                    />
                                    {errors.description && <span style={{ color: 'red' }}>Product Description is required</span>}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3 }}
                                        className="customBgColor"
                                    >Add Product</Button>
                                </form>}
                            </Box>
                            <Box>
                                {isLoading && <Box sx={{ display: 'flex' }}>
                                    {isLoading &&  <CircularProgress color="inherit" />}
                                </Box>}
                            </Box>
                            {addProductSuccess && <Box sx={{ textAlign: 'center', mb: 0 }}>
                                <Link to="/explore" className="text-white text-decoration-none"><Button className="customBgColor text-white">Explore The Products</Button></Link>
                            </Box>}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AddProducts;