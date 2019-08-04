
export function getClients(active) {
  return {
    type: 'FETCH_CLIENTS',
    payload: { active },
  };
}

export function createClient(client) {
  return {
    type: 'CREATE_CLIENT',
    payload: { client },
  };
}

export function deleteClient(clientId) {
  return {
    type: 'DELETE_CLIENT',
    payload: { clientId },
  };
}
