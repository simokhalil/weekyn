import PropTypes from 'prop-types';
import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { translate } from 'react-polyglot';

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import AppConfig from '../../AppConfig';
import CustomInput from '../../components/form/Input';
import GridContainer from '../../components/layout/GridContainer';
import GridItem from '../../components/layout/GridItem';
import { auth } from '../../firebase';

import '../../stylesheets/login.scss';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginPage extends React.Component {

  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { currentUser, history } = this.props;
    if (currentUser) {
      history.push(this.props.redirectTo);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser) {
      this.setState(() => ({ ...INITIAL_STATE }));
      this.props.history.push(this.props.redirectTo);
    }
  }

  getValidationState(attr) {
    const length = this.state[attr].length;

    switch (attr) {
      case 'email':
        if (length <= 8) {
          return null;
        }
        return this.validateEmail(this.state.email) ? 'success' : 'error';

      case 'password':
        if (length <= 3) {
          return null;
        }
        return 'success';

      default:
        return null;
    }
  }

  setStateByProp = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  login = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.doSignInWithEmailAndPassword(email, password);

      this.props.history.push(AppConfig.routePaths.homepage);
    } catch (error) {
      this.setStateByProp('error', error);
    }

    return;
  }

  gotoPage = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { email, password, error } = this.state;
    const { t } = this.props;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="login-page">


        <GridContainer justify="center">
          <GridItem xs={12}>

            <Card className="card">
              <CardHeader title={t('login.authenticate')} />

              <CardContent>

                {error && <p>{error.message}</p>}

                <form onSubmit={this.login} className="form">
                  <CustomInput
                    label={t('login.email')}
                    id="email"
                    type="email"
                    onChange={(value) => this.setStateByProp('email', value)}
                    value={email}
                  />

                  <CustomInput
                    label={t('login.password')}
                    id="password"
                    type="password"
                    onChange={(value) => this.setStateByProp('password', value)}
                    value={password}
                  />

                  <Button type="submit" disabled={isInvalid} variant="contained" size="large" color="primary">{t('login.authenticate')}</Button>
                </form>
              </CardContent>

            </Card>

            <div className="actions">
              <Link to={AppConfig.routePaths.passwordReset} className="link">{t('login.forgotPassword')}</Link>
            </div>

          </GridItem>
        </GridContainer>

        <div className="actions-container">
          <Link to={AppConfig.routePaths.signup} className="link">{t('login.signup')}</Link>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.any.isRequired,
  redirectTo: PropTypes.string,
  currentUser: PropTypes.object,
};

LoginPage.defaultProps = {
  currentUser: auth.currentUser,
  redirectTo: AppConfig.routePaths.homepage,
};

function mapStateToProps(state) {
  return {
    currentUser: state.users.authUser,
    redirectTo: state.users.redirectTo,
  };
}
export default connect(mapStateToProps)(
  translate()(
    LoginPage
  )
);