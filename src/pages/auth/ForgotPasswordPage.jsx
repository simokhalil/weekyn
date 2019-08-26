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
  error: null,
};

class ForgotPasswordPage extends React.Component {

  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { currentUser, history } = this.props;
    if (currentUser) {
      history.push(this.props.homepage);
    }

    console.log('this.props.location', this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser) {
      this.setState(() => ({ ...INITIAL_STATE }));
      this.props.history.push(this.props.redirectTo);
    }
  }

  isFormValid = () => {
    const { email } = this.state;
    if (email.length <= 8) {
      return false;
    }
    return this.validateEmail(this.state.email);
  }

  handleEmailChange = (value) => {
    this.setState({
      email: value,
    });
  };

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  submit = async (e) => {
    e.preventDefault();

    const { email } = this.state;

    try {
      await auth.doPasswordReset(email);

      // this.props.history.push(AppConfig.routePaths.homepage);
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
    const { email, error } = this.state;
    const { t } = this.props;

    const isInvalid = !this.isFormValid();

    return (
      <div className="login-page">


        <GridContainer justify="center">
          <GridItem xs={12}>

            <Card className="card">
              <CardHeader title={t('login.resetMyPassword')} />

              <CardContent>

                {error && <p>{t(`firebaseErrors.${error.code}`)}</p>}

                <form onSubmit={this.submit} className="form">
                  <CustomInput
                    label={t('login.email')}
                    id="email"
                    type="email"
                    onChange={(value) => this.handleEmailChange(value)}
                    value={email}
                  />

                  <Button type="submit" disabled={isInvalid} variant="contained" size="large" color="primary">{t('login.resetMyPassword')}</Button>
                </form>
              </CardContent>

            </Card>

            <div className="actions">
              <Link to={AppConfig.routePaths.login} className="link">{t('login.backToAuthentication')}</Link>
            </div>

          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  history: PropTypes.any.isRequired,
  redirectTo: PropTypes.string,
  currentUser: PropTypes.object,
};

ForgotPasswordPage.defaultProps = {
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
    ForgotPasswordPage,
  )
);
