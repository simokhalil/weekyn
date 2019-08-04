import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppConfig from 'AppConfig';

import ClientsListPage from 'pages/clients/ClientsListPage';
import ClientAddPage from 'pages/clients/ClientAddPage';

const ClientsPage = () => {

  return (
    <Switch>
      <Route path={AppConfig.routePaths.clients} exact component={ClientsListPage} />
      <Route path={AppConfig.routePaths.clientAdd} exact component={ClientAddPage} />
    </Switch>
  );
}

export default ClientsPage;
