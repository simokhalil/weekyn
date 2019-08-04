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
    createdAt: now,
    updatedAt: now,
  });
};

/**
 * Get client details
 * @param {*} userId
 * @param {*} clientId
 */
export const getClient = (userId, clientId) => db.collection('users').doc(userId).collection('clients').doc(clientId).get();
