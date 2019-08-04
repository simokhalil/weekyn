import { db } from '../firebase';

// export const collection = db.collection('clients');

export const addClient = (userId, client) => {
  const collection = db.collection('users').doc(userId).collection('clients');

  const now = (new Date()).getTime();

  collection.add({
    ...client,
    createdAt: now,
    updatedAt: now,
  });
};
