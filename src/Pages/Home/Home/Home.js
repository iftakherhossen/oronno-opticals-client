import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import EyeCare from '../EyeCare/EyeCare';
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
            <EyeCare/>
            <Footer />
        </div>
    );
};

export default Home;