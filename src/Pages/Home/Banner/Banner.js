import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Box } from '@mui/material';

const Banner = () => {
    return (
        <Box sx={{mt: 5}}>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/2PT8Z5B/slider-1.jpg"
                        alt="First slide"
                        draggable="false"
                    />
                    <Carousel.Caption className="carouselText">
                        <h5>MEN'S OPTICAL</h5>
                        <h1>Latest Summer Arrivals</h1>
                        <Link to="/explore">
                            <Button className="border-0 customBgColor mt-4 px-3 fw-bold">Shop New Collection</Button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/8532d2q/slider-2.jpg"
                        alt="Second slide"
                        draggable="false"
                    />

                    <Carousel.Caption className="carouselText">
                        <h5>WOMEN'S OPTICAL</h5>
                        <h1>New Arrivals</h1>
                        <Link to="/explore">
                            <Button className="border-0 customBgColor mt-4 px-3 fw-bold">Shop New Collection</Button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/xhLnbwM/slider-3.jpg"
                        alt="Third slide"
                        draggable="false"
                    />

                    <Carousel.Caption className="carouselText">
                        <h5>SUNGLASSES</h5>
                        <h1>Exclusive Sunglasses</h1>
                        <Link to="/explore">
                            <Button className="border-0 customBgColor mt-4 px-3 fw-bold">Shop New Collection</Button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Box>
    );
};

export default Banner;