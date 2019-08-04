// users reducer
export default function users(state = {}, action) {
  switch (action.type) {
    case 'CLIENTS_SET_REDUX':
      return {
        ...state,
        clients: action.payload.clients,
      };

    // initial state
    default:
      return state;
  }
}