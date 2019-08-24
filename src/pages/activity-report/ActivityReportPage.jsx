import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  CardHeader,
  IconButton,
  withStyles,
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowForward';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PdfIcon from '@material-ui/icons/PictureAsPdfOutlined';

import Button from '../../components/form/Button';
import Content from 'components/content/Content';
import SectionTitle from '../../components/content/SectionTitle';
import * as InvoicesActions from '../../redux/actions/invoices';
import * as ProjectsActions from '../../redux/actions/projects';

import 'moment/locale/fr';
import ProjectsListDialog from 'components/activity/ProjectsListDialog';
import AppConfig from 'AppConfig';

moment.locale('fr');
const cellWidth = '40px';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    fontSize: '10px',
    textAlign: 'center',
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  tableFirstCol: {
    width: 'auto',
    height: '30px',
    border: '1px solid #aaa',
    padding: 0,
    margin: 0,
  },
  tableCol: {
    width: cellWidth,
    height: cellWidth,
    minWidth: cellWidth,
    maxWidth: cellWidth,
    border: '1px solid #aaa',
    padding: 0,
    margin: 0,
  },
  tableInput: {
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 0,
    textAlign: 'center',

    '&[readonly]': {
      cursor: 'default',
    },
  },
});

const today = new Date();
today.setHours(0, 0, 0, 0);

class ActivityReportPage extends React.Component {

  constructor(props) {
    super(props);

    const currentMonth = moment(new Date(today.getFullYear(), today.getMonth(), 1));

    const currentYear = currentMonth.year();
    const currentMonthIndex = currentMonth.month();

    this.state = {
      currentMonth,
      maxMonthIndex: currentMonthIndex,
      monthLength: currentMonth.daysInMonth(),
      editingIndex: null,
      values: {},
      isProjectsListDialogOpen: false,
    };

    props.setCurrentYearAndMonth(currentYear, currentMonthIndex);

    props.getProjects();
  }

  componentDidMount() {
    const { getProjectsByYearAndMonth } = this.props;

    getProjectsByYearAndMonth();
  }

  getDayName = (day) => {
    const { currentMonth } = this.state;
    return moment(currentMonth).date(day).format('dd');
  }

  addMonth = async () => {
    const { maxMonthIndex } = this.state;
    const { getProjectsByYearAndMonth, setCurrentYearAndMonth } = this.props;
    let currentMonth = this.state.currentMonth;

    currentMonth = moment(currentMonth.add(1, 'months'));

    if (currentMonth.month() > maxMonthIndex) {
      return;
    }

    const currentYear = currentMonth.year();
    const currentMonthIndex = currentMonth.month();

    setCurrentYearAndMonth(currentYear, currentMonthIndex);
    getProjectsByYearAndMonth();

    this.setState({
      currentMonth,
      monthLength: currentMonth.daysInMonth(),
    });
  }

  subtractMonth = async () => {
    const { getProjectsByYearAndMonth, setCurrentYearAndMonth } = this.props;
    let currentMonth = this.state.currentMonth;

    currentMonth = moment(currentMonth.subtract(1, 'months'));

    const currentYear = currentMonth.year();
    const currentMonthIndex = currentMonth.month();

    setCurrentYearAndMonth(currentYear, currentMonthIndex);
    getProjectsByYearAndMonth();

    this.setState({
      currentMonth,
      monthLength: currentMonth.daysInMonth(),
    });
  }

  isWeekend = (dayOfMonth) => {
    const { currentMonth } = this.state;
    return moment(currentMonth).date(dayOfMonth).day() % 6 === 0;
  };

  onInputBlur = (projectLineIndex) => {
    const { saveProjectActivity } = this.props;
    saveProjectActivity(projectLineIndex);
  };

  setAllDays = (projectIndex) => {
    const { monthLength } = this.state;
    const { currentMonthIndex, currentYear, projectLines, saveProjectActivity, setProjectLineDayActivity } = this.props;

    projectLines[projectIndex].activity = projectLines[projectIndex].activity || {};
    projectLines[projectIndex].activity[currentYear] = projectLines[projectIndex].activity[currentYear] || {};
    projectLines[projectIndex].activity[currentYear][currentMonthIndex] = projectLines[projectIndex].activity[currentYear][currentMonthIndex] || {};

    for (let i = 0; i < monthLength; i++) {
      if (!this.isWeekend(i + 1)) {
        projectLines[projectIndex].activity[currentYear][currentMonthIndex][i] = 1;
      }
    }

    setProjectLineDayActivity(projectLines);
    saveProjectActivity(projectIndex);
  };

  openProjectsListDialog = () => {
    this.setState({ isProjectsListDialogOpen: true });
  };

  closeProjectsListDialog = () => {
    this.setState({ isProjectsListDialogOpen: false });
  };

  addProjectLine = (project) => {
    const { addProjectLine } = this.props;
    addProjectLine(project);
    this.closeProjectsListDialog();
  };

  getFilteredProjectsList = () => {
    const { clients, projects, projectLines } = this.props;

    return projects.filter((project) => {
      return projectLines.findIndex((projectLine) => projectLine.id === project.id) === -1;
    }).map((project) => {
      project.client = clients.find((client) => client.id === project.clientId)
      return project;
    });
  };

  setDayActivity = (projectIndex, dayIndex, value) => {
    const { currentMonthIndex, currentYear, projectLines, setProjectLineDayActivity } = this.props;

    projectLines[projectIndex].activity = projectLines[projectIndex].activity || {};
    projectLines[projectIndex].activity[currentYear] = projectLines[projectIndex].activity[currentYear] || {};
    projectLines[projectIndex].activity[currentYear][currentMonthIndex] = projectLines[projectIndex].activity[currentYear][currentMonthIndex] || {};
    projectLines[projectIndex].activity[currentYear][currentMonthIndex][dayIndex] = parseFloat(value);

    setProjectLineDayActivity(projectLines);
  };

  getProjectTotalDays = (projectLine) => {
    const { monthLength } = this.state;
    const { currentMonthIndex, currentYear } = this.props;

    const daysArray = [...Array(monthLength).keys()];

    return daysArray.reduce((total, day) => {
      return total + (projectLine.activity[currentYear][currentMonthIndex][day] || 0);
    }, 0, 0);
  }

  makeInvoice = (projectLine) => {
    const { monthLength } = this.state;
    const { currentUser, currentMonthIndex, currentYear, saveInvoice } = this.props;

    const daysArray = [...Array(monthLength).keys()];

    const totalDays = daysArray.reduce((total, day) => {
      return total + (projectLine.activity[currentYear][currentMonthIndex][day] || 0);
    }, 0, 0);

    const totalAmount = projectLine.tjm * totalDays;

    const invoice = {
      status: AppConfig.invoiceStates.SAVED,
      number: 2,
      color: currentUser.settings.defaultColor,
      emitterInfos: currentUser.settings.emitterInfo,
      emissionDate: moment().format('DD/MM/YYYY'),
      dueDate: moment().add('1 days').format('DD/MM/YYYY'),
      title: projectLine.name,
      totalExclTax: totalAmount,
      totalInclTax: totalAmount * 1.2,
      client: {
        name: 'Generated - Name',
        address: 'Generated - Address',
        postalCode: '44000',
        city: 'Thouaré',
        country: 'France',
      },
      lines: [{
        description: projectLine.name,
        priceExclTax: projectLine.tjm,
        tax: 20,
        quantity: totalDays,
        totalExclTax: totalAmount,
      }],
    };

    saveInvoice(invoice);
  }

  render() {
    const { currentMonth, maxMonthIndex, isProjectsListDialogOpen, monthLength } = this.state;
    const { classes, clients, currentMonthIndex, currentYear, t, projectLines } = this.props;

    const daysArray = [...Array(monthLength).keys()];

    if (!clients || !clients.length) {
      return (
        <div>No clients </div>
      )
    }

    return (
      <Content fullWidth>

        <CardHeader
          action={
            <Button variant="contained" color="secondary" size="small" onClick={this.openProjectsListDialog}>
              {t('activity.addLine')}
            </Button>
          }
          title={<SectionTitle label={t('activity.activityReport')} />}
        />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>
          <IconButton aria-label="delete" className={classes.margin} onClick={this.subtractMonth}>
            <ChevronLeftIcon />
          </IconButton>

          <div style={{ width: '150px', textAlign: 'center' }}>{moment(currentMonth).format('MMMM YYYY')}</div>

          <IconButton aria-label="delete" className={classes.margin} onClick={this.addMonth} disabled={currentMonth.month() >= maxMonthIndex}>
            <ChevronRightIcon />
          </IconButton>
        </div>

        <table className={classes.table}>
          <thead style={{ fontWeight: '600' }}>
            <tr>
              <>
                <td className={classes.tableFirstCol}>Clients / Projets</td>
                <td className={classes.tableCol}>FA</td>
                <td className={classes.tableCol} />
                <td className={classes.tableCol}>Tot</td>

                {daysArray.map((day, index) => (
                  <td
                    key={index}
                    className={classes.tableCol}
                    style={{ backgroundColor: this.isWeekend(day + 1) ? '#eee' : 'transparent' }}
                  >
                    <div>{this.getDayName(day + 1)}</div>
                    <div>{day + 1}</div>
                  </td>
                ))}
              </>
            </tr>
          </thead>
          <tbody>
            {projectLines.map((projectLine, projectLineIndex) => (
              <tr key={projectLineIndex}>
                <>
                  <td className={classes.tableFirstCol}>
                    {projectLine.name}
                  </td>

                  <td className={classes.tableCol}>
                    <IconButton aria-label="delete" size="small" onClick={() => this.makeInvoice(projectLine)}>
                      <PdfIcon fontSize="inherit" />
                    </IconButton>
                  </td>

                  <td className={classes.tableCol}>
                    <IconButton aria-label="delete" size="small" onClick={() => this.setAllDays(projectLineIndex)}>
                      <ArrowRightIcon fontSize="inherit" />
                    </IconButton>
                  </td>

                  <td className={classes.tableCol}>
                    {this.getProjectTotalDays(projectLine)}
                  </td>


                  {daysArray.map((day, index) => (
                    <td
                      key={index}
                      className={classes.tableCol}
                      style={{ backgroundColor: this.isWeekend(day + 1) ? '#eee' : 'transparent' }}
                    >
                      <input
                        onBlur={(e) => this.onInputBlur(projectLineIndex)}
                        className={classes.tableInput}
                        // readOnly={index !== editingIndex}
                        defaultValue={
                          (
                            projectLine.activity
                            && projectLine.activity[currentYear]
                            && projectLine.activity[currentYear][currentMonthIndex]
                            && projectLine.activity[currentYear][currentMonthIndex][index]
                          )
                          || ''}
                        onChange={(e) => this.setDayActivity(projectLineIndex, index, e.target.value)}
                      />
                    </td>
                  ))}
                </>
              </tr>
            ))}
          </tbody>
        </table>

        <ProjectsListDialog projects={this.getFilteredProjectsList()} isOpen={isProjectsListDialogOpen} onClose={this.closeProjectsListDialog} onSelect={this.addProjectLine} />

      </Content>
    );
  }
}

ActivityReportPage.propTypes = {
  clients: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  projectLines: PropTypes.array.isRequired,
  saveInvoice: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  clients: state.clients.clients,
  projects: state.projects.projects,
  projectLines: state.projects.projectLines,
  currentUser: state.users.authUser,
  currentYear: state.projects.currentYear,
  currentMonthIndex: state.projects.currentMonthIndex,
});

export default withStyles(styles)(
  translate()(
    connect(mapStateToProps, { ...InvoicesActions, ...ProjectsActions })(
      ActivityReportPage,
    ),
  ),
);
