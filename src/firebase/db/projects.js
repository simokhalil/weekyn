import { db } from '../firebase';

/**
 * add a project
 * @param {*} userId
 * @param {*} clientId
 */
export const addProject = (userId, clientId, project) => {
  const collection = db.collection('users').doc(userId).collection('projects');

  const now = (new Date()).getTime();

  return collection.add({
    ...project,
    clientId,
    active: true,
    createdAt: now,
    updatedAt: now,
  });
}

export const getProjectsPerClient = (userId, clientId) => {
  const collection = db.collection('users').doc(userId).collection('projects');

  return collection.where('clientId', '==', clientId);
}