import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { projectsDB, firebase } from '../../firebase/';
import { store } from '../store';

function subscribeToProjects(userId, clientId = null, active = true) {
  let projectsUnsubscribe = null;
  return eventChannel((emmiter) => {
    let collectionRef = firebase.db.collection('users').doc(userId).collection('projects').where('active', '==', active).orderBy('createdAt', 'desc');

    if (clientId) {
      collectionRef = collectionRef.where('clientId', '==', clientId);
    }

    projectsUnsubscribe = collectionRef.onSnapshot(snapshot => {
      const projects = [];

      snapshot.forEach(doc => {
        projects.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      emmiter(projects);
    });

    return () => projectsUnsubscribe();
  });
}

/**
 * Get rojects list
 */
export function* getProjectsSaga(action) {
  const state = store.getState();
  const currentUser = state.users.authUser;

  const channel = yield call(subscribeToProjects, currentUser.uid, action.payload.clientId, action.payload.active);

  yield takeEvery(channel, function* (projects) {
    yield put({ type: 'PROJECTS_SET_REDUX', payload: { projects } });
    yield put({ type: 'SET_PROJECT_LINES' });
    yield put({ type: 'SET_WORKING_DAYS_PER_MONTH' });
  });

  yield take('GET_PROJECTS_CANCEL');
  channel.close();

  /* try {
    while (true) {
      const projects = yield take(channel);
      yield put({ type: 'PROJECTS_SET_REDUX', payload: { projects } });
      yield put({ type: 'SET_PROJECT_LINES' });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  } */
}

/**
 * Add project Saga
 */
export function* addProjectSaga(action) {
  const { clientId, project } = action.payload;

  const state = store.getState();
  const currentUser = state.users.authUser;

  try {
    yield projectsDB.addProject(currentUser.uid, clientId, project);

    yield put({ type: 'CREATE_PROJECT_SUCCESS' });
  } catch (error) {
    console.warn('error adding project', error);
    yield put({ type: 'CREATE_PROJECT_ERROR' });
  }
}

/**
 * Save project activity Saga
 */
export function* saveProjectActivitySaga(action) {
  const { projectLineIndex } = action.payload;

  const state = store.getState();
  const currentUser = state.users.authUser;
  const project = state.projects.projectLines[projectLineIndex];
  const currentYear = state.projects.currentYear;
  const currentMonthIndex = state.projects.currentMonthIndex;
  const activity = project.activity[currentYear][currentMonthIndex];

  try {
    yield projectsDB.setProjectActivity(currentUser.uid, project.id, currentYear, currentMonthIndex, activity);
    yield put({ type: 'SET_PROJECT_ACTIVITY_SUCCESS' });

  } catch (error) {
    console.warn('error saving project activity', error);
    yield put({ type: 'SET_PROJECT_ACTIVITY_ERROR' });
  }
}

/**
 * Save project activity Saga
 */
export function* getProjectsByYearAndMonthSaga(action) {
  const { year, month } = action.payload;

  const state = store.getState();
  const projects = state.projects.projects;

  const projectLines = projects.filter((project => {
    return (!!project.activity && !!project.activity[year] && !!project.activity[year][month]);
  }));

  yield put({
    type: 'SET_PROJECT_LINES',
    payload: [...projectLines],
  });
}

function* watch() {
  yield takeLatest('GET_PROJECTS', getProjectsSaga);
  yield takeLatest('ADD_PROJECT', addProjectSaga);
  yield takeLatest('SAVE_PROJECT_ACTIVITY', saveProjectActivitySaga);
  // yield takeLatest('GET_PROJECTS_BY_YEAR_AND_MONTH', getProjectsByYearAndMonthSaga);
}

export default watch;