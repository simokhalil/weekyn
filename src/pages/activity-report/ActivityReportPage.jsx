import React from 'react';
import moment from 'moment';

import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowForward';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ContentToolbar from 'components/content/ContentToolbar';
import Content from 'components/content/Content';

import 'moment/locale/fr';
// import './Homepage.scss';

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

    this.state = {
      currentMonth,
      monthLength: currentMonth.daysInMonth(),
      editingIndex: null,
      values: {},
    };
  }

  getDayName = (day) => {
    const { currentMonth } = this.state;
    return moment(currentMonth).date(day).format('dd');
  }

  addMonth = async () => {
    const { currentMonth } = this.state;


    this.setState({
      currentMonth: moment(currentMonth.add(1, 'months')),
      monthLength: currentMonth.daysInMonth(),
    });
  }

  subtractMonth = async () => {
    const { currentMonth } = this.state;


    this.setState({
      currentMonth: moment(currentMonth.subtract(1, 'months')),
      monthLength: currentMonth.daysInMonth(),
    });
  }

  isWeekend = (dayOfMonth) => {
    const { currentMonth } = this.state;
    return moment(currentMonth).date(dayOfMonth).day() % 6 === 0;
  };

  onInputBlur = (index, value) => {
    const { values } = this.state;

    this.setState({
      editingIndex: null,
      values: {
        ...values,
        [index]: value,
      },
    });
  };

  setAllDays = () => {
    const { monthLength } = this.state;
    const values = {}

    for (let i = 0; i < monthLength; i++) {
      if (!this.isWeekend(i + 1)) {
        values[i] = 1;
      }
    }

    this.setState({ values });
  };

  render() {
    const { currentMonth, editingIndex, monthLength, values } = this.state;
    const { classes } = this.props;

    const daysArray = [...Array(monthLength).keys()];

    console.log('values', values);
    console.log('currentMonth', currentMonth);
    console.log('monthLength', monthLength);
    console.log('daysArray', daysArray);

    return (
      <Content fullWidth>

        <ContentToolbar title="CRA" />

        <div style={{ display: 'inline-block', width: '200px' }}>
          <FormControl className={classes.formControl}>
            <Select
              value={10}
              defaultValue={10}
              onChange={this.handleChange}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              <MenuItem value={10}>Mois</MenuItem>
              <MenuItem value={20}>Semaine</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>
          <IconButton aria-label="delete" className={classes.margin} onClick={this.subtractMonth}>
            <ChevronLeftIcon />
          </IconButton>

          <div style={{ width: '150px', textAlign: 'center' }}>{moment(currentMonth).format('MMMM YYYY')}</div>

          <IconButton aria-label="delete" className={classes.margin} onClick={this.addMonth}>
            <ChevronRightIcon />
          </IconButton>
        </div>

        <table className={classes.table}>
          <thead style={{ fontWeight: '600' }}>
            <tr>
              <>
                <td className={classes.tableFirstCol}>Clients / Projets</td>
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
            <tr>
              <>
                <td className={classes.tableFirstCol}>
                  <IconButton aria-label="delete" size="small" onClick={this.setAllDays}>
                    <ArrowRightIcon fontSize="inherit" />
                  </IconButton>
                </td>
                {daysArray.map((day, index) => (
                  <td
                    key={index}
                    className={classes.tableCol}
                    style={{ backgroundColor: this.isWeekend(day + 1) ? '#eee' : 'transparent' }}
                  >
                    <input
                      onDoubleClick={(e) => { console.log('ok'); this.setState({ editingIndex: index }); e.target.focus(); }}
                      onBlur={(e) => this.onInputBlur(index, e.target.value)}
                      className={classes.tableInput}
                      // readOnly={index !== editingIndex}
                      defaultValue={values[index] || ''}
                    />
                  </td>
                ))}
              </>
            </tr>
          </tbody>
        </table>

      </Content>
    );
  }
}

export default withStyles(styles)(
  ActivityReportPage,
);
