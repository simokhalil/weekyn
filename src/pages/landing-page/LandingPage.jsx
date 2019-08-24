import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-polyglot';

import AppConfig from '../../AppConfig';
import Footer from '../../components/landing/Footer';
import HomeSection from '../../components/landing/HomeSection';
import Navbar from '../../components/landing/Navbar';
import ServicesSection from '../../components/landing/ServicesSection';

import '../../stylesheets/landing.scss';

const LandingPage = ({ t }) => {

  return (
    <>
      <Navbar />
      <HomeSection />
      <ServicesSection />
      <Footer />
    </>
  );
}

export default translate()(
  LandingPage,
);
