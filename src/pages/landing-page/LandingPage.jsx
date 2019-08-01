import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-polyglot';

import AppConfig from '../../AppConfig';

const LandingPage = ({ t }) => {

  return (
    <>
      <div>Landing page</div>

      <Link to={AppConfig.routePaths.login}>{t('hello')}</Link>
    </>
  );
}

export default translate()(
  LandingPage,
);
