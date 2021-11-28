import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import useAuth from '../../../hooks/useAuth';

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

const BookingModal = ({ product, openModal, handleModalClose, setOrderSuccess }) => {
    const { title, price } = product;
    const { user } = useAuth();

    const initialInfo = { name: user.displayName, email: user.email }
    const [orderInfo, setOrderInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...orderInfo };
        newInfo[field] = value;
        setOrderInfo(newInfo);
    }
    const handleSubmit = e => {
        // collect data
        const order = {
            ...orderInfo,
            title,
            price
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
                    handleModalClose();
                    alert('Your Order is under processing. Check Dashboard to get updates!');
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
                        <Typography id="transition-modal-title" variant="h5" component="h2" className="customColor" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                            {title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                id="standard-size-normal"
                                defaultValue={user.displayName}
                                variant="standard"
                                name="name"
                                onBlur={handleOnBlur}
                                sx={{ my: 2, width: '48%' }}
                            />
                            <TextField
                                id="standard-size-normal"
                                defaultValue={user.email}
                                variant="standard"
                                name="email"
                                onBlur={handleOnBlur}
                                sx={{ my: 2, width: '48%' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                id="standard-size-normal"
                                defaultValue="+88"
                                variant="standard"
                                name="phone"
                                title="Phone Number"
                                onBlur={handleOnBlur}
                                sx={{ my: 2, width: '48%' }}
                                required
                            />
                            <TextField
                                id="standard-size-option"
                                defaultValue="Cash on Delivery"
                                variant="standard"
                                name="paymentMethod"
                                title="Payment Method"
                                onBlur={handleOnBlur}
                                sx={{ my: 2, width: '47%' }}
                                readOnly
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControl variant="standard">
                                <Input
                                    id="standard-adornment-amount"
                                    defaultValue="1"
                                    type="number"
                                    name="quantity"
                                    startAdornment={<InputAdornment position="start">Quantity</InputAdornment>}
                                    onBlur={handleOnBlur}
                                    title="Quantity"
                                    sx={{ my: 2, width: '91%' }}
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <Input
                                    id="standard-adornment-amount"
                                    value={price}
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
                            placeholder="Enter Your Address *"
                            variant="standard"
                            name="address"
                            title="Address"
                            onBlur={handleOnBlur}
                            sx={{ my: 2, width: '100%' }}
                            required
                        />
                        <Button variant="contained" sx={{ fontWeight: 'bold', mt: 2 }} onClick={handleSubmit} className="customBgColor">Submit</Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default BookingModal;