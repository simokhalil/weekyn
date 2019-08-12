import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import Content from '../../components/content/Content';
import ContentToolbar from 'components/content/ContentToolbar';
import Input from 'components/form/Input';
import FooterActions from 'components/layout/FooterActions';
import AppConfig from 'AppConfig';
import GridContainer from 'components/layout/GridContainer';
import GridItem from 'components/layout/GridItem';
import * as ClientsActions from '../../redux/actions/clients';

class ClientAddPage extends Component {
  state = {
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
    },
  };

  handleClientAttributeChange = (varName, value) => {
    const { client } = this.state;

    this.setState({
      client: {
        ...client,
        [varName]: value,
      },
    });
  };

  addClient = () => {
    const { client } = this.state;
    const { history, createClient } = this.props;

    try {
      history.push(AppConfig.routePaths.clients);
      createClient(client);
    } catch (error) {
      console.log('error creating client', error);
    }
  };

  render() {
    const { client } = this.state;
    const { t } = this.props;

    return (
      <Content style={{ marginBottom: '100px' }}>
        <ContentToolbar title="Ajouter un client" />

        <h4>{t('clients.identity')}</h4>

        <Input
          label={t('clients.name')}
          value={client.name}
          onChange={(text) => this.handleClientAttributeChange('name', text)}
        />

        <h4>{t('clients.contact')}</h4>

        <GridContainer>
          <GridItem xs={12} sm={6}>
            <Input
              label={t('clients.email')}
              value={client.email}
              onChange={(text) => this.handleClientAttributeChange('email', text)}
            />
          </GridItem>

          <GridItem xs={12} sm={6}>
            <Input
              label={t('clients.phone')}
              value={client.phone}
              onChange={(text) => this.handleClientAttributeChange('phone', text)}
            />
          </GridItem>
        </GridContainer>

        <h4>{t('clients.address')}</h4>

        <Input
          label={t('clients.address')}
          value={client.address}
          onChange={(text) => this.handleClientAttributeChange('address', text)}
        />

        <GridContainer>
          <GridItem xs={4}>
            <Input
              label={t('clients.postalCode')}
              value={client.postalCode}
              onChange={(text) => this.handleClientAttributeChange('postalCode', text)}
            />
          </GridItem>

          <GridItem xs={8}>
            <Input
              label={t('clients.city')}
              value={client.city}
              onChange={(text) => this.handleClientAttributeChange('city', text)}
            />
          </GridItem>
        </GridContainer>

        <Input
          label={t('clients.country')}
          value={client.country}
          onChange={(text) => this.handleClientAttributeChange('country', text)}
        />

        <FooterActions
          cancelLabel={t('common.cancel')}
          validateLabel={t('common.save')}
          onValidate={this.addClient}
        />
      </Content>
    )
  }
}

ClientAddPage.propTypes = {
  createClient: PropTypes.func.isRequired,
}

export default translate()(
  connect(null, ClientsActions)(
    ClientAddPage,
  ),
);
