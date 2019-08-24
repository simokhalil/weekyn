import moment from 'moment';

const INITIAL_STATE = {
  projects: [],
  projectLines: [],
  currentYear: moment().year(),
  currentMonthIndex: moment().month(),
  workedDaysForCurrentYear: [],
};

export default function projects(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'PROJECTS_SET_REDUX': {
      return {
        ...state,
        projects: action.payload.projects,
      };
    }

    case 'SET_CURRENT_YEAR_AND_MONTH': {
      const { year, month } = action.payload;

      return {
        ...state,
        currentYear: year,
        currentMonthIndex: month,
      };
    }

    case 'SET_PROJECT_LINES': {
      const { currentYear, currentMonthIndex } = state;

      const projectLines = state.projects.filter((project => {
        return (!!project.activity && !!project.activity[currentYear] && !!project.activity[currentYear][currentMonthIndex]);
      }));

      return {
        ...state,
        projectLines,
      };
    }

    case 'SET_PROJECT_LINE': {
      const { projectLines } = action.payload;

      return {
        ...state,
        projectLines,
      };
    }

    case 'ADD_PROJECT_LINE': {
      const { projectLines } = state;

      const { project } = action.payload;

      projectLines.push(project);

      return {
        ...state,
        projectLines,
      };
    }

    case 'SET_WORKING_DAYS_PER_MONTH': {
      const { currentYear, projects } = state;

      const workingDays = [];
      let month = 0;

      for (month = 0; month < 12; month++) {
        let nbDays = 0;

        projects.forEach((project) => {
          if (project.activity && project.activity[currentYear] && project.activity[currentYear][month]) {
            Object.values(project.activity[currentYear][month]).forEach((day) => {
              nbDays += parseFloat(day) || 0;
            })
          }
        });

        workingDays[month] = {
          name: month + 1,
          jours: nbDays
        };
      }

      console.log('workingDays', workingDays);
      return {
        ...state,
        workedDaysForCurrentYear: [...workingDays],
      };
    }

    // initial state
    default:
      return state;
  }
}