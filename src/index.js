import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { I18n } from 'react-polyglot';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import App from './App';
import MessagesEnglish from './i18n/en';
import MessagesFrench from './i18n/fr';
import * as serviceWorker from './serviceWorker';
import { getBrowserLanguage } from './utils/browser';
import { history, store } from './redux/store';

import 'moment/locale/fr';
import './stylesheets/global.scss';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: { main: '#00c386' },
    danger: { main: '#a94442' },
    error: red,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontSize: 14,
    fontFamily: [
      'Raleway',
      'Open Sans',
      'Roboto',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

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

ReactDOM.render(
  <Provider store={store} history={history}>
    <I18n locale={locale} messages={messages}>
      <MuiThemeProvider theme={theme}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <App />
        </Router>
      </MuiThemeProvider>
    </I18n>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
