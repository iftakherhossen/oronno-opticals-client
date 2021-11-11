import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import HomeProducts from '../HomeProducts/HomeProducts';
import ShowReview from '../ShowReviews/ShowReviews';

const Home = () => {
    return (
        <div>
            <Navigation />
            <Banner />
            <HomeProducts />
            <ShowReview />
            <Footer />
        </div>
    );
};

export default Home;