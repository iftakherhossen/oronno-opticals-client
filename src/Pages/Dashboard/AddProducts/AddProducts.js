import React, { useState } from 'react';
import { CircularProgress,Container, TextField, Typography, Button, Alert, Grid, FormControl, Input, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const AddProducts = () => {
    const { user, isLoading, authError } = useAuth();
    const [addProductSuccess, setAddProductSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        fetch('http://localhost:5000/products', {
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
                                        placeholder="Product Key S = Sunglasses & O = Opticals"
                                        {...register("key", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    {errors.key && <span style={{ color: 'red' }}>This field is required</span>}
                                    <TextField
                                        placeholder="Product Name"
                                        {...register("name", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
                                    <TextField
                                        placeholder="Product Image Link"
                                        {...register("imageLink", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    {errors.imageLink && <span style={{ color: 'red' }}>This field is required</span>}
                                    <TextField
                                        placeholder="Product Price"
                                        {...register("price", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    {errors.price && <span style={{ color: 'red' }}>This field is required</span>}
                                    <textarea
                                        placeholder="Product Description"
                                        {...register("description", { required: true })}
                                        variant="standard"
                                        style={{ width: '100%', mb: 2, height: 100 }}
                                    ></textarea>
                                    {errors.description && <span style={{ color: 'red' }}>This field is required</span>}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ my: 3 }}
                                        className="customBgColor"
                                    >Add Product</Button>
                                </form>}
                            </Box>
                            <Box>
                                {isLoading && <CircularProgress />}
                                {addProductSuccess && <Alert severity="success" sx={{ mt: 3, width: '100%', mx: 'auto', fontWeight: 'bold' }}>Product Added Successfully!</Alert>}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AddProducts;