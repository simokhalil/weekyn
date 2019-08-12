import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppConfig from 'AppConfig';

import ClientsArchivedListPage from '../../pages/clients/ClientsArchivedListPage';
import ClientsListPage from 'pages/clients/ClientsListPage';
import ClientAddPage from 'pages/clients/ClientAddPage';
import ClientDetailsPage from './ClientDetailsPage';

const ClientsPage = () => {

  return (
    <Switch>
      <Route path={AppConfig.routePaths.clients} exact component={ClientsListPage} />
      <Route path={AppConfig.routePaths.clientsArchived} exact component={ClientsArchivedListPage} />
      <Route path={AppConfig.routePaths.clientAdd} exact component={ClientAddPage} />
      <Route path={AppConfig.routePaths.clientEdit} component={ClientAddPage} />
      <Route path={AppConfig.routePaths.clientDetails} component={ClientDetailsPage} />
    </Switch>
  );
}

export default ClientsPage;
