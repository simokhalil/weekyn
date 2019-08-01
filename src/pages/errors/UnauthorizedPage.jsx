import React, {Component} from 'react';

class UnAuthorizedPage extends Component {

  render() {
    const { t } = this.props;
    return (
      <div>
        <h3>Vous n'êtes pas autorisé à visiter cette page</h3>
      </div>
    );
  }
}

UnAuthorizedPage.propTypes = {
};

export default UnAuthorizedPage;
