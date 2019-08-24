import PropTypes from 'prop-types';
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <h3>Jours travaillés cette année</h3>
              <LineChart
                width={500}
                height={300}
                data={workedDaysForCurrentYear}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="jours" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
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
