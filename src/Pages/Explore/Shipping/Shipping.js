import { CircularProgress, Container, TextField, Typography, Button, Alert, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../../utilities/fakedb';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import { useHistory } from 'react-router';

const Shipping = () => {
    const { user, isLoading, authError } = useAuth();
    const [orderSuccess, setOrderSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const history = useHistory();

    const onSubmit = data => {
        const savedCart = getStoredCart();
        data.status = 'Pending';
        data.order = savedCart;
        console.log(data)

        fetch('https://boiling-spire-70151.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setOrderSuccess(true);
                    clearTheCart();
                    reset();
                }
            })
        history.push('/dashboard')
    };

    return (
        <Box>
            <Navigation />
            <Container>
                <Box sx={{ pt: 8, textAlign: 'center' }}>
                    <Typography variant="h5">Fill the information to order</Typography>
                </Box>

                <Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={12} sm={8} md={4} sx={{ mx: 'auto' }}>
                            <Box>
                                {isLoading && <CircularProgress />}
                                {orderSuccess && <Alert severity="success" sx={{ mt: 3, width: '100%', mx: 'auto', fontWeight: 'bold' }}>Your Order is Under Processing!</Alert>}
                                {authError && <Alert severity="error" sx={{ mt: 3, width: '100%', mx: 'auto', fontWeight: 'bold' }}>{authError}</Alert>}
                            </Box>
                            <Box sx={{ textAlign: 'center', my: 4 }}>
                                {!isLoading && <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                                    <TextField
                                        defaultValue={user.displayName}
                                        {...register("name")}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    <TextField
                                        defaultValue={user.email}
                                        {...register("email", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
                                    <TextField
                                        placeholder="Address"
                                        defaultValue=""
                                        {...register("address", { required: true })}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    {errors.address && <span style={{ color: 'red' }}>This field is required</span>}
                                    <TextField

                                        defaultValue="Cash on Delivery" {...register("Payment")}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    <TextField
                                        placeholder="phone number"
                                        defaultValue="" {...register("phone")}
                                        variant="standard"
                                        sx={{ width: '100%', mb: 2 }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ my: 5 }}
                                        className="customBgColor"
                                    >Proceed to Shipping</Button>
                                </form>}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
            <Footer />
        </Box >
    );
};

export default Shipping;