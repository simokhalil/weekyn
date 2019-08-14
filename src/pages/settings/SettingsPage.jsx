import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';

import Button from '../../components/form/Button';
import ColorPicker from '../../components/invoices/ColorPicker';
import Content from '../../components/content/Content';
import LogoUploader from 'components/settings/LogoUploader';
import SectionTitle from '../../components/content/SectionTitle';
import * as UserActions from '../../redux/actions/user';

import '../../stylesheets/settings.scss';

class SettingsPage extends Component {
  state = {
    files: [],
  };

  handleLogoSave = (id) => {
    const { currentUser, saveUserSettings } = this.props;
    saveUserSettings({
      ...currentUser.settings,
      logoId: id,
    });
  };

  handleClearLogo = () => {
    const { currentUser, saveUserSettings } = this.props;
    saveUserSettings({
      ...currentUser.settings,
      logoId: null,
    });
  };

  handleEmitterInfoChange = (e) => {
    const { currentUser, saveUserSettings } = this.props;

    saveUserSettings({
      ...currentUser.settings,
      emitterInfo: e.target.value,
    });
  };

  handleDefaultColorChange = (color) => {
    const { currentUser, saveUserSettings } = this.props;

    saveUserSettings({
      ...currentUser.settings,
      defaultColor: color,
    });
  };

  render() {
    const { currentUser, t } = this.props;

    if (!currentUser.settings) {
      return null;
    }

    const { settings } = currentUser;

    const files = !settings.logoId ? [] : [{
      source: settings.logoId,
      options: {
        type: "local"
      }
    }];

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
              <div className="settingsItem">
                <div>Logo</div>

                <LogoUploader
                  onRequestSave={this.handleLogoSave}
                  onRequestClear={this.handleClearLogo}
                  defaultFiles={files}
                />
              </div>

              <div className="settingsItem">
                <div>Informations emetteur</div>

                {/* <textarea className="emitterInfo" value={settings.emitterInfo} onChange={this.handleEmitterInfoChange} /> */}

                <ContentEditable
                  placeholder="Infos emetteur"
                  html={settings.emitterInfo} // innerHTML of the editable div
                  disabled={false}       // use true to disable editing
                  onChange={this.handleEmitterInfoChange} // handle innerHTML change
                  className="emitterInfo"
                  style={{ border: '1px solid #aaa', borderRadius: '5px', padding: '10px' }}
                />
              </div>

              <div className="settingsItem">
                <div>Couleur par défaut</div>

                <ColorPicker
                  color={settings.defaultColor}
                  onChange={this.handleDefaultColorChange}
                />
              </div>

            </>
          </CardContent>
        </Card>


      </Content>
    );
  }
}

SettingsPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
});

export default translate()(
  connect(mapStateToProps, UserActions)(
    SettingsPage,
  ),
);
