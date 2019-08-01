// users reducer
export default function users(state = {}, action) {
  const authUser = action.data;

  switch (action.type) {
    case 'USER_SIGNED_IN':
      console.log('storing user to store  ', authUser);
      return {
        ...state,
        authUser,
      };

    case 'USER_SIGNED_OUT':
      return {
        redirectTo: authUser.redirectTo,
      };

    // initial state
    default:
      return state;
  }
}