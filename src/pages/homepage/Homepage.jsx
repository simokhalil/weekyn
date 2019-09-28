import PropTypes from 'prop-types';
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { connect } from 'react-redux';

import { withStyles, Paper, Grid } from '@material-ui/core';

import ContentToolbar from 'components/content/ContentToolbar';
import Content from 'components/content/Content';
import NoContentCard from 'components/content/NoContentCard';
import * as ProjectsActions from '../../redux/actions/projects';

import './Homepage.scss';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
});

const today = new Date();
today.setHours(0, 0, 0, 0);

class Homepage extends React.Component {

  componentDidMount() {
  }

  render() {

    const { workedDaysForCurrentYear } = this.props;

    return (
      <Content>

        <ContentToolbar title="Dashboard" />

        <Grid container>
          <Grid item xs={12} md={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <h3>Jours travaillés en {today.getFullYear()}</h3>
              <ResponsiveContainer width="100%" minHeight={300}>
                <LineChart
                  data={workedDaysForCurrentYear}
                  margin={{
                    top: 5, right: 30, left: 0, bottom: 5,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="jours" stroke="#4F81BC" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>


        {/* <NoContentCard /> */}

      </Content>
    );
  }
}

Homepage.propTypes = {
  getWorkingDaysByMonthforCurrentYear: PropTypes.func.isRequired,
  workedDaysForCurrentYear: PropTypes.array,
};

Homepage.defaultProps = {
  workedDaysForCurrentYear: [],
};

const mapStateToProps = (state) => ({
  workedDaysForCurrentYear: state.projects.workedDaysForCurrentYear,
});

export default withStyles(styles)(
  connect(mapStateToProps, ProjectsActions)(
    Homepage,
  ),
);
