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
import { auth, userDB } from '../../firebase';

import '../../stylesheets/login.scss';

const INITIAL_SETTINGS = {
  logoId: null,
  emitterInfo: '',
  defaultColor: '#0693E3',
};

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  error: null,
};

class SignupPage extends React.Component {

  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    console.log('Signup page : props.currentUser', this.props);
  }

  componentWillReceiveProps(newProps) {
    console.log('Signup page new Props : ', newProps, newProps.currentUser);
    if (newProps.currentUser) {
      this.setState(() => ({ ...INITIAL_STATE }));
      this.props.history.push(this.props.redirectTo);
    }
  }

  getValidationState(attr) {
    const length = this.state[attr].length;

    switch (attr) {
      case 'name':
        if (length <= 2) {
          return null;
        }
        return true;
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

  signup = async (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;
    const { history } = this.props;

    try {
      const authUser = await auth.doCreateUserWithEmailAndPassword(email, password);
      console.log('created user : ', authUser);

      try {
        await userDB.doCreateUser(authUser.user.uid, name, email, { ...INITIAL_SETTINGS });
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(AppConfig.routePaths.login);

      } catch (error) {
        console.log('error creatin db user');
        this.setStateByProp('error', error);
      }

    } catch (error) {
      console.log('error creatin auth user');
      this.setStateByProp('error', error);
    }

    return;
  }

  gotoPage = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { name, email, password, error } = this.state;
    const { t } = this.props;

    const isInvalid = name === '' || password === '' || email === '';

    return (
      <div className="login-page">
        <GridContainer justify="center">
          <GridItem xs={12}>

            <Card className="card">
              <CardHeader title={t('signup.signUp')} />

              <CardContent>

                {error && <p>{error.message}</p>}

                <form onSubmit={this.signup} className="form">
                  <CustomInput
                    label={t('signup.name')}
                    id="name"
                    type="text"
                    onChange={(value) => this.setStateByProp('name', value)}
                    value={name}
                  />

                  <CustomInput
                    label={t('signup.email')}
                    id="email"
                    type="email"
                    onChange={(value) => this.setStateByProp('email', value)}
                    value={email}
                  />

                  <CustomInput
                    label={t('signup.password')}
                    id="password"
                    type="password"
                    onChange={(value) => this.setStateByProp('password', value)}
                    value={password}
                  />

                  <Button type="submit" disabled={isInvalid} variant="contained" size="large" color="primary">{t('signup.signUp')}</Button>
                </form>
              </CardContent>

            </Card>

          </GridItem>
        </GridContainer>

        <div className="actions-container">
          <Link to={AppConfig.routePaths.login} className="link">{t('signup.login')}</Link>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.any.isRequired,
  redirectTo: PropTypes.string,
  currentUser: PropTypes.object,
};

SignupPage.defaultProps = {
  currentUser: auth.currentUser,
  redirectTo: '/',
};

function mapStateToProps(state) {
  console.log('global state : ', state);
  return {
    currentUser: state.users.authUser,
    redirectTo: state.users.redirectTo,
  };
}
export default connect(mapStateToProps)(
  translate()(
    SignupPage,
  )
);