// users reducer
export default function invoices(state = {}, action) {
  switch (action.type) {
    case 'INVOICES_SET_REDUX':
      return {
        ...state,
        invoices: action.payload.invoices,
      };

    // initial state
    default:
      return state;
  }
}