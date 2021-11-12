import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import AboutUs from '../AboutUs/AboutUs';
import Banner from '../Banner/Banner';
import HomeProducts from '../HomeProducts/HomeProducts';
import ShowReviews from '../ShowReviews/ShowReviews';

const Home = () => {
    return (
        <div>
            <Navigation />
            <Banner />
            <HomeProducts />
            <ShowReviews />
            <AboutUs/>
            <Footer />
        </div>
    );
};

export default Home;