import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import Footer from '../../components/landing/Footer';
import HomeSection from '../../components/landing/HomeSection';
import Navbar from '../../components/landing/Navbar';
import ServicesSection from '../../components/landing/ServicesSection';

import '../../stylesheets/landing.scss';

const LandingPage = ({ currentUser, t }) => {

  return (
    <>
      <Navbar user={currentUser} />
      <HomeSection />
      <ServicesSection />
      <Footer />
    </>
  );
};

LandingPage.propTypes = {
  currentUser: PropTypes.object,
};

LandingPage.defaultProps = {
  currentUser: null,
};

const mapStateToProps = (state) => ({
  currentUser: state.users.authUser,
});

export default translate()(
  connect(mapStateToProps)(
    LandingPage,
  ),
);
