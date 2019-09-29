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
import Switch from '../../components/form/Switch';
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

  handleInvoiceInfoChange = (field, value) => {
    const { currentUser, saveUserSettings } = this.props;

    saveUserSettings({
      ...currentUser.settings,
      invoice: {
        ...currentUser.settings.invoice,
        [field]: value,
      },
    });
  }

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
          title={<SectionTitle label={t('settings.settings')} />}
          style={{ marginBottom: '30px' }}
        />

        <CardHeader
          subheader={t('settings.general')}
        />

        <Card>


          <CardContent style={{ padding: 0 }}>
            <>
              <div className="settingsItem">
                <div className="settingsItemLeft">Logo</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Choisissez votre logo. Il sera visible en haut à gauche de vos factures, au dessus des informations emetteur
                  </div>

                  <LogoUploader
                    onRequestSave={this.handleLogoSave}
                    onRequestClear={this.handleClearLogo}
                    defaultFiles={files}
                    />
                </div>
              </div>

              <div className="settingsItem">
                <div className="settingsItemLeft">TVA</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Êtes-vous assujetti à la tva ?
                  </div>

                  {/* <Switch /> */}
                </div>
              </div>
            </>
          </CardContent>
        </Card>

        <CardHeader
          subheader="Mes factures"
        />

        <Card>
          <CardContent style={{ padding: 0 }}>
            <>
              <div className="settingsItem">
                <div className="settingsItemLeft">Informations emetteur</div>

                {/* <textarea className="emitterInfo" value={settings.emitterInfo} onChange={this.handleEmitterInfoChange} /> */}

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Ces informations sont visibles en haut à gauche des factures
                  </div>

                  <ContentEditable
                    placeholder="Infos emetteur"
                    html={settings.emitterInfo} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleEmitterInfoChange} // handle innerHTML change
                    className="emitterInfo"
                    style={{ border: '1px solid #aaa', borderRadius: '5px', padding: '10px' }}
                  />
                </div>
              </div>

              <div className="settingsItem">
                <div className="settingsItemLeft">Couleur par défaut</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Ce paramètre définit la couleur par défaut utilisée pour les factures. Il peut être changé ponctuellement pendant l'édition de chaque facture.
                  </div>
                  <ColorPicker
                    flat
                    color={settings.defaultColor}
                    onChange={this.handleDefaultColorChange}
                  />
                </div>
              </div>

              <div className="settingsItem">
                <div className="settingsItemLeft">Délai de paiement</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Délai de règlement par défaut
                  </div>
                </div>
              </div>

              <div className="settingsItem">
                <div className="settingsItemLeft">Mentions</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Ces informations sont visibles parmi les mentions affichées sur vos factures
                  </div>

                  <div className="settingItemDescription">
                    Coordonnées bancaires
                  </div>
                  <ContentEditable
                    placeholder="Coordonnées bancaires"
                    html={settings.invoice ? settings.invoice.bankInfo : null} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(e) => this.handleInvoiceInfoChange('bankInfo', e.target.value)} // handle innerHTML change
                    className="emitterInfo"
                  />

                  <div className="settingItemDescription">
                    Retard de paiement
                  </div>
                  <ContentEditable
                    placeholder="Coordonnées bancaires"
                    html={settings.invoice ? (settings.invoice.overdue || null) : null} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(e) => this.handleInvoiceInfoChange('overdue', e.target.value)} // handle innerHTML change
                    className="emitterInfo"
                  />

                  <div className="settingItemDescription">
                    Inscription au registre du commerce et des sociétés (RCS)
                  </div>
                  <ContentEditable
                    placeholder="Coordonnées bancaires"
                    html={settings.invoice ? (settings.invoice.rcs || null) : null} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(e) => this.handleInvoiceInfoChange('rcs', e.target.value)} // handle innerHTML change
                    className="emitterInfo"
                  />

                  <div className="settingItemDescription">
                    Pieds de page
                  </div>
                  <ContentEditable
                    placeholder="Coordonnées bancaires"
                    html={settings.invoice ? (settings.invoice.footer || null) : null} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(e) => this.handleInvoiceInfoChange('footer', e.target.value)} // handle innerHTML change
                    className="emitterInfo"
                  />
                </div>

              </div>

            </>
          </CardContent>
        </Card>


        <CardHeader
          subheader="Mon compte"
        />

        <Card>


          <CardContent style={{ padding: 0 }}>
            <>
              <div className="settingsItem">
                <div className="settingsItemLeft">Mot de passe</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Cette option vous permet de changer votre mot de passe
                  </div>

                  <Button color="light" variant="outlined">Changer mon mot de passe</Button>
                </div>
              </div>

              <div className="settingsItem">
                <div className="settingsItemLeft">Réinitialisation</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Cette option vous permet de réinitialiser votre compte
                  </div>

                  <Button color="danger" variant="outlined">Réinitialiser mon compte</Button>
                </div>
              </div>

              <div className="settingsItem">
                <div className="settingsItemLeft">Suppression</div>

                <div className="SettingsItemRight">
                  <div className="settingItemDescription">
                    Cette option vous permet de supprimer définitivement votre compte
                  </div>

                  <Button color="danger">Supprimer mon compte</Button>
                </div>
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
