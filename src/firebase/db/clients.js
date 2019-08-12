import { db } from '../firebase';

// export const collection = db.collection('clients');

/**
 * Create new client for given user
 * @param {*} userId
 * @param {*} client
 */
export const addClient = (userId, client) => {
  const collection = db.collection('users').doc(userId).collection('clients');

  const now = (new Date()).getTime();

  collection.add({
    ...client,
    active: true,
    createdAt: now,
    updatedAt: now,
  });
};

/**
 * Save existing client
 * @param {*} userId
 * @param {*} client
 */
export const saveClient = (userId, clientId, client) => {
  const collection = db.collection('users').doc(userId).collection('clients').doc(clientId);

  const now = (new Date()).getTime();

  collection.set({
    ...client,
    updatedAt: now,
  }, { merge: true });
};

/**
 * Get client details
 * @param {*} userId
 * @param {*} clientId
 */
export const getClient = (userId, clientId) => db.collection('users').doc(userId).collection('clients').doc(clientId).get();

/**
 * Set client as archived (active = false)
 * @param {*} userId
 * @param {*} clientId
 */
export const archiveClient = (userId, clientId) => {
  return db.collection('users').doc(userId).collection('clients').doc(clientId).set({
    active: false,
    updatedAt: (new Date()).getTime(),
  }, { merge: true });
}

/**
 * Delete client
 * @param {*} userId
 * @param {*} clientId
 */
export const deleteClient = (userId, clientId) => db.collection('users').doc(userId).collection('clients').doc(clientId).delete();
