import React from 'react';
import moment from 'moment';
import { I18n } from 'react-polyglot';
import { Provider } from 'react-redux';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import AppConfig from './AppConfig';
import Homepage from './pages/homepage/Homepage';
import LandingPage from './pages/landing-page/LandingPage';
import MessagesEnglish from './i18n/en';
import MessagesFrench from './i18n/fr';
import { getBrowserLanguage } from './utils/browser';
import { history, store } from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontSize: 16,
    fontFamily: [
      'Raleway',
      'Open Sans',
      'Roboto',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

if (AppConfig.debug === 'false') {
  console.log = () => { };
}

const locale = getBrowserLanguage();
console.log('App locale : ', locale);
moment.locale(locale);

let messages = null;

switch (locale) {
  case 'fr':
    messages = MessagesFrench;
    break;
  default:
    messages = MessagesEnglish;
    break;
}

function App() {
  return (
    <Provider store={store} history={history}>
      <I18n locale={locale} messages={messages}>
        <MuiThemeProvider theme={theme}>
          <Router onUpdate={() => window.scrollTo(0, 0)}>
            <Switch>
              <Route path={AppConfig.routePaths.landingPage} exact component={LandingPage} />
              <Route path={AppConfig.routePaths.homepage} exact component={Homepage} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </I18n>
    </Provider>
  );
}

export default App;
