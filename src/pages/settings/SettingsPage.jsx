import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { translate } from 'react-polyglot';

import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';

import Button from '../../components/form/Button';
import Content from '../../components/content/Content';
import SectionTitle from '../../components/content/SectionTitle';

class SettingsPage extends Component {

  render() {
    const { t } = this.props;

    return (
      <Content>
        <CardHeader
          action={
            <>
              <Button variant="contained" color="secondary" size="small" onClick={this.saveInvoice} style={{ marginRight: '10px' }}>
                {t('common.save')}
              </Button>
            </>
          }
          title={<SectionTitle label={t('settings.settings')} />}
          style={{ marginBottom: '30px' }}
        />

        <Card>
          <CardHeader
            subheader={t('settings.general')}
          />

          <CardContent>
            <>
              <div>Logo</div>

            </>
          </CardContent>
        </Card>


      </Content>
    );
  }
}

SettingsPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(
  SettingsPage,
);
