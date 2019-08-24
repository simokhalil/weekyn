export function getProjects(clientId, active = true) {
  return {
    type: 'GET_PROJECTS',
    payload: { clientId, active },
  };
}

export function setCurrentYearAndMonth(year, month) {
  return {
    type: 'SET_CURRENT_YEAR_AND_MONTH',
    payload: { year, month },
  };
}

export function getProjectsByYearAndMonth() {
  return {
    type: 'SET_PROJECT_LINES',
  };
}

export function addProjectLine(project) {
  return {
    type: 'ADD_PROJECT_LINE',
    payload: { project },
  };
}

export function setProjectLineDayActivity(projectLines) {
  return {
    type: 'SET_PROJECT_LINE',
    payload: { projectLines },
  };
}

export function addProject(clientId, project) {
  return {
    type: 'ADD_PROJECT',
    payload: { clientId, project },
  };
}

export function saveProjectActivity(projectLineIndex) {
  return {
    type: 'SAVE_PROJECT_ACTIVITY',
    payload: { projectLineIndex },
  };
}

export function getWorkingDaysByMonthforCurrentYear() {
  return {
    type: 'SET_WORKING_DAYS_PER_MONTH',
  }
}
