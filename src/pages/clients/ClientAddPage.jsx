import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import Content from 'components/content/Content';
import ContentToolbar from 'components/content/ContentToolbar';
import Input from 'components/form/Input';
import FooterActions from 'components/layout/FooterActions';
import { clientsDB } from '../../firebase';
import AppConfig from 'AppConfig';

class ClientAddPage extends Component {
  state = {
    client: {
      name: '',
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
    const { history } = this.props;

    try {
      clientsDB.addClient(this.props.currentUser.uid, this.state.client);
      history.push(AppConfig.routePaths.clients);
    } catch {

    }
  };

  render() {
    const { client } = this.state;
    const { t } = this.props;

    return (
      <Content>
        <ContentToolbar title="Ajouter un client" />

        <Input
          label="Nom du client"
          value={client.name}
          onChange={(text) => this.handleClientAttributeChange('name', text)}
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
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
});

export default translate()(
  connect(mapStateToProps)(
    ClientAddPage,
  ),
);
