
export function getClients() {
  return {
    type: 'FETCH_CLIENTS',
  };
}

export function createClient(client) {
  return {
    type: 'CREATE_CLIENT',
    payload: { client },
  };
}