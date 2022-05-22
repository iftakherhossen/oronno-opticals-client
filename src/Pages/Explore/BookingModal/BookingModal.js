import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

const BookingModal = ({ product, openModal, handleModalClose, setOrderSuccess, discountedPrice, handleCloseSearchModal }) => {
    const { title, price } = product;
    const { user } = useAuth();
    const initialInfo = { name: user.displayName, email: user.email };
    const [orderInfo, setOrderInfo] = useState(initialInfo);
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...orderInfo };
        newInfo[field] = value;
        setOrderInfo(newInfo);
    }
    const handleSubmit = e => {
        const deliveryCharge = 30;
        const totalPrice = (price * orderInfo.quantity) + deliveryCharge;
    
        // collect data
        const order = {
            ...orderInfo,
            title,
            price,
            totalPrice,
            deliveryCharge,
            date
        }

        // send data to the server
        fetch('https://boiling-spire-70151.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setOrderSuccess(true);
                    handleCloseSearchModal();
                    handleModalClose();
                    Swal.fire(
                        'Order Placed!',
                        `Order has been placed successfully! Your Total Cost is $${totalPrice}`,
                        'success'
                    )
                }
            });

        e.preventDefault();
    }
    return (
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h5" component="h2" className="customColor" sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 1 }}>
                            {title}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField
                                    id="standard-size-normal"
                                    label="Name"
                                    type="text"
                                    value={user.displayName}
                                    variant="standard"
                                    name="name"
                                    onBlur={handleOnBlur}
                                    sx={{ my: 2, width: '48%' }}
                                    readOnly
                                    required
                                />
                                <TextField
                                    id="standard-size-normal"
                                    label="Email"
                                    type="email"
                                    value={user.email}
                                    variant="standard"
                                    name="email"
                                    onBlur={handleOnBlur}
                                    sx={{ my: 2, width: '48%' }}
                                    readOnly
                                    required
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField
                                    id="standard-size-normal"
                                    variant="standard"
                                    label="Phone"
                                    name="phone"
                                    type="text"
                                    title="Phone Number"
                                    onBlur={handleOnBlur}
                                    sx={{ my: 2, width: '48%' }}
                                    required
                                />
                                <FormControl variant="standard" sx={{ my: 2, width: '47%', textAlign: 'left' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Payment Method</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        onBlur={handleOnBlur}
                                        label="Payment Method"
                                        name="paymentMethod"
                                        title="Payment Method"
                                        required
                                    >
                                        <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                                        <MenuItem value="Online Payment">Online Payment</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControl variant="standard">
                                    <Input
                                        id="standard-adornment-amount"
                                        type="number"
                                        name="quantity"
                                        startAdornment={<InputAdornment position="start">Quantity</InputAdornment>}
                                        onBlur={handleOnBlur}
                                        title="Quantity"
                                        sx={{ my: 2, width: '91%' }}
                                        required
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <Input
                                        id="standard-adornment-amount"
                                        value={discountedPrice ? discountedPrice : price}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        endAdornment={<InputAdornment position="end">x1</InputAdornment>}
                                        sx={{ my: 2, width: '100%' }}
                                        readOnly
                                    />
                                </FormControl>
                            </Box>
                            <TextField
                                id="standard-size-normal"
                                label="Address"
                                variant="standard"
                                name="address"
                                title="Address"
                                type="text"
                                onBlur={handleOnBlur}
                                sx={{ my: 2, width: '100%' }}
                                required
                            />
                            <Typography variant='subtitle1' sx={{ color: '#FE6766' }}>N:B: Delivery Charge: <strong>$30</strong> will be applied!</Typography>
                            <Button variant="contained" type="submit" sx={{ fontWeight: 'bold', mt: 2 }} className="customBgColor">Submit</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default BookingModal;