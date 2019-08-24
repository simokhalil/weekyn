import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { translate } from 'react-polyglot';

import AppConfig from '../../AppConfig';
import ComputingImage from '../../assets/images/home-01.jpg';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const HomeSection = ({ t }) => {

  return (
    <section className="home-section" id="home">
      <div className="container">
        <Grid container>
          <Grid item md={7} className="leftCol" style={{ paddingTop: '30px' }}>
            <h1 dangerouslySetInnerHTML={{ __html: t('landing.headerTitle') }} />
            <p>{t('landing.headerDescription')}</p>
            <Button variant="contained" color="primary" size="large" component={AdapterLink} to={AppConfig.routePaths.signup}>{t('landing.headerCTA')}</Button>
          </Grid>

          <Grid item md={5}>
            <img src={ComputingImage} className="hero-image" style={{ width: '100%' }} alt="Weekyn" />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default translate()(
  HomeSection,
);
